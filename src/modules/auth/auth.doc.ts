export const registerApiResponse = {
  success: {
    description: 'User registered successfully',
    schema: {
      example: {
        success: true,
        message: 'User registered successfully',
        data: {
          id: '1a2b3c',
          username: 'Faisal Ahmed',
          email: 'faisal@gmail.com',
        },
      },
    },
  },
  validationError: {
    description: 'Validation Error',
    schema: {
      example: {
        success: false,
        message: 'Invalid email address',
      },
    },
  },
  conflictError: {
    description: 'Email already in use',
    schema: {
      example: {
        success: false,
        message: 'User already exists',
      },
    },
  },
};

export const loginApiResponse = {
  success: {
    description:
      'User logged in successfully. A refresh token is set via httpOnly cookie, and access token is returned in response body.',
    schema: {
      example: {
        success: true,
        message: 'User logged in successfully',
        data: {
          accessToken: '<JWT_ACCESS_TOKEN>',
        },
      },
    },
  },
  validationError: {
    description: 'Validation error',
    schema: {
      example: {
        success: false,
        message: 'Validation failed: Email is not valid',
      },
    },
  },
  unauthorized: {
    description: 'Invalid credentials',
    schema: {
      example: {
        success: false,
        message: 'Invalid email or password',
      },
    },
  },
};

export const accessTokenApiResponse = {
  success: {
    description: 'Access token retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'Access token retrieved successfully',
        data: {
          accessToken: '<NEW_JWT_ACCESS_TOKEN>',
        },
      },
    },
  },
  unauthorized: {
    description: 'No or invalid refresh token provided',
    schema: {
      example: {
        success: false,
        message: 'No token has been provided',
      },
    },
  },
};
