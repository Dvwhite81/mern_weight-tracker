import axios from 'axios';
import { WeightFormData } from '../utils/types';

const baseUrl = 'http://localhost:7000/api';

const login = async (username: string, password: string) => {
  const user = { username, password };
  console.log('userService login user:', user);
  const response = await axios.post(`${baseUrl}/login`, user);

  console.log('userService login response:', response);
  const { data } = response;
  console.log('userService login data:', data);
  if (data.success) {
    return {
      success: true,
      message: data.message,
      user: data.user,
      token: data.token,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const register = async (username: string, password: string) => {
  const user = { username, password };

  const { data } = await axios.post(`${baseUrl}/register`, user);
  console.log('userService register data:', data);
  if (data.success) {
    return login(username, password);
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const getWeightById = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/weights/${id}`);
  console.log('getWeightById data:', data);

  if (data) {
    const { success } = data;
    console.log('getWeightById success:', success);

    if (success) {
      const { weight } = data;
      return {
        success: true,
        weight: weight,
      };
    }
  }
};

const getUserWeights = async (username: string, token: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${username}/weights`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('getUserWeights data:', data);
  if (data.success) {
    const weightIds = data.weights;
    const userWeights = [];

    for (const id of weightIds) {
      const weight = getWeightById(id);
      userWeights.push(weight);
    }
    return {
      success: true,
      weights: userWeights,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const addUserWeight = async (token: string, newWeight: WeightFormData) => {
  const { data } = await axios.post(
    `${baseUrl}/weights`,
    {
      token,
      weight: newWeight,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('addUserWeight data:', data);
  if (data.success) {
    return {
      success: true,
      message: data.message,
      newWeight: newWeight,
      weights: data.weights,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

const deleteUserWeight = async (token: string, weightId: string) => {
  const { user } = await getUserByToken(token);
  console.log('deleteUserWeight weightId:', weightId);
  const { username } = user;

  const { data } = await axios.put(
    `${baseUrl}/users/${username}/weights/${weightId}`
  );
  console.log('deleteUserWeight data:', data);
  if (data.success) {
    return {
      success: true,
      message: 'Deleted weight',
      weights: data.weights,
    };
  }
};

const getUserByToken = async (token: string) => {
  const { data } = await axios.get(`${baseUrl}/users/${token}`);

  if (data.success) {
    return {
      success: true,
      user: data.user,
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};

export default {
  addUserWeight,
  deleteUserWeight,
  getUserByToken,
  getUserWeights,
  login,
  register,
};
