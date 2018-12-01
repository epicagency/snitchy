export default {
  pages: {
    all: {
      page: [{
        event: 'page-load',
        data: {
          title: '$tagTitle',
          pagePath: '$url',
          customDim: 'somethingCustom',
        },
      }],
      offline: [
        {
          event: 'page-load',
          data: {
            actions: 'somethingGlobal',
          },
        },
        {
          event: 'page-refresh',
          data: {
            actions: 'somethingDifferent',
          },
        },
      ],
    },
    products: {
      page: [{
        event: 'page-load',
        data: {
          category: '$thisCategory',
        },
      }],
      offline: [{
        event: 'page-refresh',
        data: {
          actions: 'somethingSpecific',
        },
      }],
    },
    singleProduct: {
      page: [{
        event: 'page-load',
        data: {
          productId: '$valProductId',
        },
      }],
    },
  },
  events: {
    search: {
      default: [{
        event: 'search',
        data: {
          trigger: 'submit',
          eventValue: '$refInputValue',
          customDim: 'somethingCustom',
        },
      }],
    },
    contact: {
      success: [{
        event: 'formSubmit',
        data: {
          trigger: 'success',
          eventValue: '$refInputValue',
        },
      }],
      error: [{
        event: 'formError',
        data: {
          trigger: 'error',
          eventValue: '$refInputValue',
        },
      }],
    },
  },
};
