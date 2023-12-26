import axios, { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";

const getCounters = (): Promise<
  AxiosResponse<{ counters: Record<string, number> }>
> => {
  return axios.get("http://localhost:4000/counters", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const createUser = (
  username: string
): Promise<AxiosResponse<{ username: string }>> => {
  return axios.post("http://localhost:4000/login", {
    username,
  });
};

const increaseCounter = (
  username: string
): Promise<AxiosResponse<{ counters: Record<string, number> }>> => {
  return axios.put("http://localhost:4000/counters/" + username);
};

const App: React.FC = () => {
  const [loggedInAs, setLoggedInAs] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string>("");
  const [counters, setCounters] = useState<Record<string, number>>({});

  const login = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      createUser(username)
        .then((response) => setLoggedInAs(response.data.username))
        .catch(console.error);
    },
    [username]
  );

  const fetchCounters = useCallback((): void => {
    getCounters()
      .then((response) => setCounters(response.data.counters))
      .catch(console.error);
  }, []);

  const handleUsernameChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>): void => {
      e.preventDefault();
      setUsername(e.currentTarget.value);
    },
    []
  );

  const handleIncreaseCounter = useCallback(
    (e: React.FormEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      increaseCounter(username)
        .then((response) => setCounters(response.data.counters))
        .catch(console.error);
    },
    [username]
  );

  const handleLogout = (): void => {
    setLoggedInAs(undefined);
  };

  useEffect(() => {
    let eventSource: EventSource;
    if (loggedInAs !== undefined) {
      fetchCounters();
      eventSource = new EventSource("http://localhost:4000/events");

      eventSource.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setCounters(data);
      };
    }
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [loggedInAs]);

  return (
    <main className="App">
      {loggedInAs === undefined ? (
        <div>
          <h1>Welcome</h1>
          <form onSubmit={login}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={handleUsernameChange}
            />
            <input type="submit" value="Login" />
          </form>
        </div>
      ) : (
        <div>
          <h1>Counters</h1>
          <h3>
            Logged in as {loggedInAs} (
            <a href="#" onClick={handleLogout}>
              logout
            </a>
            )
          </h3>
          <div id="counters">
            <ul>
              {Object.keys(counters).map((username) => (
                <li key={username}>
                  {username}: {counters[username]}
                </li>
              ))}
            </ul>
          </div>
          <div id="increase-counter">
            <button onClick={handleIncreaseCounter}>Click here!</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
