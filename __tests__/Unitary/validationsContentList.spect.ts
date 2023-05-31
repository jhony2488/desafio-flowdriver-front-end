import { validationKeys,validationValues } from '../../src/utils/validationsContentList';

describe('ValidationIsIntegirOrFloat.spec', () => {
  it('should check the keys and return the value of the corresponding label', async () => {
    expect( validationKeys('name')).toBe('Nome:');
    expect( validationKeys('value')).toBe('Valor');
    expect( validationKeys('amount')).toBe('Quantidade');
  });
  it('should check the typing of the values ​​and return the corresponding value in the best formatted form', async () => {
    expect(validationValues(true)).toBe('Sim');
    expect(validationValues('jhony')).toBe('jhony');
    expect(validationValues(5)).toBe('R$ 5,00');
  });
});