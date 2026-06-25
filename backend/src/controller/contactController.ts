import { Request, Response } from 'express';
import contactService from '../services/contactService';

export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.status(200).json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
    }
};

export const getContactById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("id parameter not given");
        }
        const contact = await contactService.getContactById(id as string);

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch contacts', error });
    }
};

export const addContact = async (req: Request, res: Response) => {
    try {
        const newContact = await contactService.createContact(req.body);
        res.status(201).json({ success: true, name: newContact.name });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create contact' });
    }
};

export const editContact = async (req: Request, res: Response) => {
    try {
        const updatedContact = await contactService.updateContact(req.params.id as string, req.body);
        res.status(200).json({ success: true, data: updatedContact });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update contact' + error });
    }
};

export const removeContact = async (req: Request, res: Response) => {
    try {
        await contactService.deleteContact(req.params.id as string);
        res.status(200).json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete contact ' });
    }
};
