import { Contact } from '../model/Contact';

const contactRepository = {
    findAll: async () => {
        return await Contact.find().sort({ createdAt: -1 });
    },

    findById: async (id: string) => {
        return await Contact.findById(id);
    },

    create: async (contactData: any) => {
        return await Contact.create(contactData);
    },

    updateById: async (id: string, updateData: any) => {
        return await Contact.findByIdAndUpdate(id, updateData, { new: true });
    },

    deleteById: async (id: string) => {
        return await Contact.findByIdAndDelete(id);
    }
};

export default contactRepository;