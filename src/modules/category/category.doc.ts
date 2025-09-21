export const createCategoryApiResponse = {
  success: {
    description: 'Category created successfully',
    schema: {
      example: {
        success: true,
        message: 'Category created successfully',
        data: {
          id: 'clx123abc',
          name: 'Electronics',
          description: 'All kind of electronics items',
        },
      },
    },
  },
  validationError: {
    description: 'Validation error',
    schema: {
      example: {
        success: false,
        message: 'name is required, description must be a string',
      },
    },
  },
  unauthorized: {
    description: 'Unauthorized access',
    schema: {
      example: {
        success: false,
        message: 'User is not authorized to perform this action',
      },
    },
  },
  conflict: {
    description: 'Category with the same name already exists',
    schema: {
      example: {
        success: false,
        message: 'Duplicate record already exists',
      },
    },
  },
};

export const getCategoriesApiResponse = {
  success: {
    description:
      'List of categories with product counts retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Categories fetched successfully',
        data: [
          {
            id: 'clx123abc',
            name: 'Electronics',
            description: 'All kind of electronics items',
          },
          {
            id: 'clx456def',
            name: 'Books',
            description: 'All genres of books',
          },
        ],
      },
    },
  },
  unauthorized: {
    description: 'Unauthorized access',
    schema: {
      example: {
        success: false,
        message: 'User is not authorized to perform this action',
      },
    },
  },
};

export const getCategoryDetailsApiResponse = {
  success: {
    description: 'Category details retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Category details fetched successfully',
        data: {
          id: 'clx123abc',
          name: 'Electronics',
          description: 'All kind of electronics items',
        },
      },
    },
  },
  notFound: {
    description: 'Category not found',
    schema: {
      example: {
        success: false,
        message: 'Record not found',
      },
    },
  },
  unauthorized: {
    description: 'Unauthorized access',
    schema: {
      example: {
        success: false,
        message: 'User is not authorized to perform this action',
      },
    },
  },
};

export const updateCategoryApiResponse = {
  success: {
    description: 'Category updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Category updated successfully',
        data: {
          id: 'clx123abc',
          name: 'Home Appliances',
          description: 'All kind of home appliances',
        },
      },
    },
  },
  notFound: {
    description: 'Category not found',
    schema: {
      example: {
        success: false,
        message: 'Record not found',
      },
    },
  },
  unauthorized: {
    description: 'Unauthorized access',
    schema: {
      example: {
        success: false,
        message: 'User is not authorized to perform this action',
      },
    },
  },
  conflict: {
    description: 'Another category with the same name already exists',
    schema: {
      example: {
        success: false,
        message: 'Duplicate record already exists',
      },
    },
  },
};

export const deleteCategoryApiResponse = {
  success: {
    description: 'Category deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Category deleted successfully',
      },
    },
  },
  notFound: {
    description: 'Category not found',
    schema: {
      example: {
        success: false,
        message: 'Record not found',
      },
    },
  },
  unauthorized: {
    description: 'Unauthorized access',
    schema: {
      example: {
        success: false,
        message: 'User is not authorized to perform this action',
      },
    },
  },
  badRequest: {
    description:
      'Category cannot be deleted because it has associated products',
    schema: {
      example: {
        success: false,
        message: 'Category can bot be deleted as it has products!',
      },
    },
  },
};
