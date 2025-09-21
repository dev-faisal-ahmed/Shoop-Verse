export const createProductApiResponse = {
  success: {
    description: 'Product created successfully',
    schema: {
      example: {
        success: true,
        message: 'Product created successfully',
        data: {
          id: 'prod_123',
          name: 'Laptop Pro',
          description: 'A high-end laptop for professionals',
          price: 1499.99,
          stock: 50,
          categoryId: 'cat_abc',
          imageUrl: 'http://example.com/image.jpg',
          imageId: 'img_xyz',
        },
      },
    },
  },
  validationError: {
    description: 'Validation error for request body or file',
    schema: {
      example: {
        success: false,
        message: 'price must be a positive number, image file is too large',
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

export const getProductsApiResponse = {
  success: {
    description: 'Paginated list of products retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Products fetched successfully',
        data: [
          {
            id: 'prod_123',
            name: 'Laptop Pro',
            price: 1499.99,
            stock: 50,
            imageUrl: 'http://example.com/image.jpg',
            categoryId: 'cat_abc',
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
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

export const getProductDetailsApiResponse = {
  success: {
    description: 'Product details retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Product fetched successfully',
        data: {
          id: 'prod_123',
          name: 'Laptop Pro',
          description: 'A high-end laptop for professionals',
          price: 1499.99,
          stock: 50,
          imageUrl: 'http://example.com/image.jpg',
          category: {
            id: 'cat_abc',
            name: 'Electronics',
          },
        },
      },
    },
  },
  notFound: {
    description: 'Product not found',
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

export const updateProductApiResponse = {
  success: {
    description: 'Product updated successfully',
    schema: {
      example: {
        success: true,
        message: 'Product updated successfully',
        data: {
          id: 'prod_123',
          name: 'Laptop Pro X',
          description: 'An even better high-end laptop',
          price: 1599.99,
          stock: 45,
          categoryId: 'cat_abc',
          imageUrl: 'http://example.com/new_image.jpg',
          imageId: 'img_xyz_new',
        },
      },
    },
  },
  notFound: {
    description: 'Product not found',
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

export const deleteProductApiResponse = {
  success: {
    description: 'Product deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'Product deleted successfully',
      },
    },
  },
  notFound: {
    description: 'Product not found',
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

export const searchProductsApiResponse = {
  success: {
    description: 'Search results for products retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Search results for "Laptop"',
        data: [
          {
            id: 'prod_123',
            name: 'Laptop Pro',
            price: 1499.99,
            stock: 50,
            imageUrl: 'http://example.com/image.jpg',
            categoryId: 'cat_abc',
          },
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
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
