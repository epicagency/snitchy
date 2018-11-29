export default {
  pages: {
    all: {
      page: {
        'page-load': {
          title: '$tagTitle',
          pagePath: '$url',
          customDim: 'somthingCustom',
        },
      },
      other: {
        'page-other': {
          actions: 'somethingGlobal',
        },
      },
    },
    products: {
      page: {
        'page-load': {
          category: '$thisCategory',
        },
      },
      other: {
        'page-other': {
          actions: 'somethingSpecific',
        },
      },
    },
    singleProduct: {
      page: {
        'page-load': {
          productId: '$valProductId',
        },
      },
    },
  },
  events: {
    search: {
      default: {
        search: {
          trigger: 'submit',
          eventValue: '$refInputValue',
          customDim: 'somthingCustom',
        },
      },
    },
    contact: {
      success: {
        formSubmit: {
          trigger: 'success',
          eventValue: '$refInputValue',
        },
      },
      error: {
        formError: {
          trigger: 'error',
          eventValue: '$refInputValue',
        },
      },
    },
  },
};
