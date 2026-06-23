import { Request, Response } from 'express';
import quoteService from '../services/quoteService';

export const getQuotes = async (req: Request, res: Response) => {
    try {
        const quotes = await quoteService.getAllQuotes();
        res.status(200).json({ success: true, data: quotes });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch quotes' });
    }
};

export const getQuoteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("id parameter not given");
        }
        const quote = await quoteService.getQuoteById(id as string);

        if (!quote) {
            return res.status(404).json({ success: false, message: 'Quote not found' });
        }
        res.status(200).json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch quotes', error });
    }
};

export const addQuote = async (req: Request, res: Response) => {
    try {
        const newQuote = await quoteService.createQuote(req.body);
        res.status(201).json({ success: true, name: newQuote.name });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create quote' });
    }
};

export const editQuote = async (req: Request, res: Response) => {
    try {
        const updatedQuote = await quoteService.updateQuote(req.params.id as string, req.body);
        res.status(200).json({ success: true, data: updatedQuote });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update quote' + error });
    }
};

export const removeQuote = async (req: Request, res: Response) => {
    try {
        await quoteService.deleteQuote(req.params.id as string);
        res.status(200).json({ success: true, message: 'Quote deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete quote ' });
    }
};
