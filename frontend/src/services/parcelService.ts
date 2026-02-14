const parcelService = {
    identifyPostOffice: async (address: string) => {
        // Simulate API call
        if (!address) throw new Error('Address is required');

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            street: address,
            city: 'Sample City',
            state: 'Sample State',
            pinCode: '123456',
            postOffice: 'Sample Post Office PO'
        };
    }
};

export default parcelService;
