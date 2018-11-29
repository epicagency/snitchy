export default {
  pages: {
    all: {
      page: {
        event: 'page-load',
        data: {
          title: '$tagTitle',
          pagePath: '$url',
          customDim: 'somthingCustom',
        },
      },
      other: {
        event: 'page-other',
        data: {
          actions: 'somethingGlobal',
        },
      },
    },
    products: {
      page: {
        event: 'page-load',
        data: {
          category: '$thisCategory',
        },
      },
      other: {
        event: 'page-other',
        data: {
          actions: 'somethingSpecific',
        },
      },
    },
    singleProduct: {
      page: {
        event: 'page-load',
        data: {
          productId: '$valProductId',
        },
      },
    },
  },
  events: {
    search: {
      default: {
        event: 'search',
        data: {
          trigger: 'submit',
          eventValue: '$refInputValue',
          customDim: 'somthingCustom',
        },
      },
    },
    contact: {
      success: {
        event: 'formSubmit',
        data: {
          trigger: 'success',
          eventValue: '$refInputValue',
        },
      },
      error: {
        event: 'formError',
        data: {
          trigger: 'error',
          eventValue: '$refInputValue',
        },
      },
    },
  },
};
