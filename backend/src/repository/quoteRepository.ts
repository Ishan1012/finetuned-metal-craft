import { Quote } from '../model/Quotes';

const quoteRepository = {
    findAll: async () => {
        return await Quote.find().sort({ createdAt: -1 });
    },

    findById: async (id: string) => {
        return await Quote.findById(id);
    },

    create: async (quoteData: any) => {
        return await Quote.create(quoteData);
    },

    updateById: async (id: string, updateData: any) => {
        return await Quote.findByIdAndUpdate(id, updateData, { new: true });
    },

    deleteById: async (id: string) => {
        return await Quote.findByIdAndDelete(id);
    }
};

export default quoteRepository;