export default {
  pages: {
    all: {
      page: {
        title: '$tagTitle',
        pagePath: '$url',
        customDim: 'somthingCustom',
      },
      other: {
        actions: 'somethingGlobal',
      },
    },
    products: {
      page: {
        category: '$thisCategory',
      },
      other: {
        actions: 'somethingSpecific',
      },
    },
    singleProduct: {
      page: {
        productId: '$valProductId',
      },
    },
  },
  events: {
    search: {
      default: {
        trigger: 'submit',
        event: 'search',
        eventValue: '$refInputValue',
        customDim: 'somthingCustom',
      },
    },
    contact: {
      success: {
        trigger: 'success',
        event: 'formSubmit',
        eventValue: '$refInputValue',
      },
      error: {
        trigger: 'error',
        event: 'formError',
        eventValue: '$refInputValue',
      },
    },
  },
};
