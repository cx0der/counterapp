import { Response, Request } from "express";

interface Client {
  id: string;
  response: Response;
}

const counters: Record<string, number> = {};
let clients: Client[] = [];

const getCounters = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ counters });
  } catch (error) {
    throw error;
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.body.username;
    counters[username] = counters[username] || 0;
    res.status(200).json({ username });
  } catch (error) {
    throw error;
  }
};

const increaseCounter = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.params.username;
    counters[username] += 1;
    res.status(200).json({ counters });
    return notifyClients();
  } catch (error) {
    throw error;
  }
};

const eventsHandler = async (req: Request, res: Response): Promise<void> => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);
  const data = `data: ${JSON.stringify(counters)}\n'n`;
  res.write(data);
  const clientId = Date.now().toString();
  clients.push({
    id: clientId,
    response: res,
  });

  req.on("close", () => {
    clients = clients.filter((c) => c.id !== clientId);
  });
};

const notifyClients = async () => {
  clients.forEach((c) => {
    c.response.write(`data: ${JSON.stringify(counters)}\n\n`);
  });
};

export { getCounters, createUser, increaseCounter, eventsHandler };
