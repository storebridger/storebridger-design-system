import { StorageVariable } from './constants/storageVariables';
import { decodeData, encodeData } from './crypto';
import { logger } from './logger';
import _ from 'lodash';

class LocalStore {
  public getItem(key: StorageVariable) {
    const localStorageValue = localStorage.getItem(key);
    if (!localStorageValue) return null;
    const decodedValue = decodeData(localStorageValue);
    const valueIsJson = this.isJSON(decodedValue);

    if (valueIsJson) {
      return JSON.parse(decodedValue as string);
    }

    return decodedValue;
  }

  public setItem(key: StorageVariable, value: any) {
    localStorage.setItem(key, encodeData(value));
    return value;
  }

  public removeItem(key: StorageVariable) {
    localStorage.removeItem(key);
  }

  public setToObjectItem(key: StorageVariable, value: Record<string, any>) {
    const existingValues = localStore.getItem(key);
    if (!existingValues) {
      this.setItem(key, value);
    }

    if (!_.isObject(existingValues)) {
      logger.warn('Item requested is not an object');
      return null;
    }

    const updatedItem = { ...existingValues, ...value };

    this.setItem(key, updatedItem);
    return this.getItem(key);
  }

  public setToArrayItem(key: StorageVariable, value: string | number | object) {
    const existingValues = this.getItem(key);

    if (!Array.isArray(existingValues)) {
      logger.warn('Item requested is not an array');
      return null;
    }

    if (existingValues && existingValues.length > 0) {
      const updatedValues = [...existingValues, value];
      localStorage.setItem(key, encodeData(updatedValues));
      return value;
    }

    localStorage.setItem(key, encodeData([value]));
    return value;
  }

  public removeFromArrayItem(
    key: StorageVariable,
    value: string | number,
    isObjectProperty?: boolean,
    property?: string,
  ) {
    const existingValues = this.getItem(key);

    if (!Array.isArray(existingValues)) {
      logger.warn('Item requested is not an array');
      return null;
    }

    if (!existingValues) return;
    if (existingValues && existingValues.length <= 0) return;

    if (isObjectProperty && property) {
      const updatedValues = existingValues.filter(
        item => item[property] === !value,
      );
      localStorage.setItem(key, encodeData(updatedValues));
      return value;
    }

    const updatedValues = existingValues.filter(item => item === !value);
    localStorage.setItem(key, encodeData(updatedValues));
    return value;
  }

  public arrayItemHasValue(key: StorageVariable, value: string | number) {
    const item = this.getItem(key);
    if (!Array.isArray(item)) {
      logger.warn('item is not of array type');
      return false;
    }

    return item.includes(value);
  }

  clearLocalStore() {
    this.removeItem(StorageVariable.USER_DATA);
    this.removeItem(StorageVariable.TOKENS);
    this.removeItem(StorageVariable.TOKEN_EXPIRY);
    this.removeItem(StorageVariable.ONBOARDING_EMAIL);
    this.removeItem(StorageVariable.RESETING_EMAIL);
    this.removeItem(StorageVariable.RESETING_TOKEN);
    this.removeItem(StorageVariable.INVITE_ROUTE);
    this.removeItem(StorageVariable.ORDER_ITEMS);
    this.removeItem(StorageVariable.CONTRACT_ITEMS);
    this.removeItem(StorageVariable.SELECTED_BUSINESS_ID);
    this.removeItem(StorageVariable.PRODUCT_WRITE_FLOW_STAGE);
    this.removeItem(StorageVariable.PRODUCT_WRITE_FLOW_DRAFT);
    this.removeItem(StorageVariable.PRODUCT_WRITE_FLOW_PREVIOUS_STAGE);
    this.removeItem(StorageVariable.CREATE_PRODUCT_VARIATIONS);
    this.removeItem(StorageVariable.CREATE_PRODUCT_OPTIONS);
    this.removeItem(StorageVariable.MEDIA_IMAGES);
    this.removeItem(StorageVariable.CREATE_ORDER_STAGE);
    this.removeItem(StorageVariable.CREATE_ORDER_PREVIOUS_STAGE);
    this.removeItem(StorageVariable.CREATE_PRODUCT_VARIATIONS);
    this.removeItem(StorageVariable.CREATE_PRODUCT_VARIATIONS);
  }

  private isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  private isJSON(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }
}

export const localStore = new LocalStore();
