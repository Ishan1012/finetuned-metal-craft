import quoteRepository from '../repository/quoteRepository';

const quoteService = {
    getAllQuotes: async () => {
        return await quoteRepository.findAll();
    },

    getQuoteById: async (id: string) => {
        return await quoteRepository.findById(id);
    },

    createQuote: async (quoteData: any) => {
        return await quoteRepository.create(quoteData);
    },

    updateQuote: async (id: string, updateData: any) => {
        return await quoteRepository.updateById(id, updateData);
    },

    deleteQuote: async (id: string) => {
        return await quoteRepository.deleteById(id);
    }
};

export default quoteService;