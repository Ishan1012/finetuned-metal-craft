import contactRepository from '../repository/contactRepository';

const contactService = {
    getAllContacts: async () => {
        return await contactRepository.findAll();
    },

    getContactById: async (id: string) => {
        return await contactRepository.findById(id);
    },

    createContact: async (contactData: any) => {
        return await contactRepository.create(contactData);
    },

    updateContact: async (id: string, updateData: any) => {
        return await contactRepository.updateById(id, updateData);
    },

    deleteContact: async (id: string) => {
        return await contactRepository.deleteById(id);
    }
};

export default contactService;