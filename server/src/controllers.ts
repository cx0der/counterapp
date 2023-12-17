import { Response, Request } from 'express'

const counters: Record<string, number> = {};

const getCounters = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ counters });
    } catch (error) {
        throw error
    }
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const username = req.body.username;
        counters[username] = counters[username] || 0;
        res.status(200).json({ username });
    } catch (error) {
        throw error
    }
}

const increaseCounter = async (req: Request, res: Response): Promise<void> => {
    try {
        const username = req.params.username;
        counters[username] += 1;
        res.status(200).json({ counters });
    } catch (error) {
        throw error
    }
}

export { getCounters, createUser, increaseCounter }
