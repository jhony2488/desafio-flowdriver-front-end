export function validationKeys(key: string) {
  return key === 'name'
    ? 'Nome:'
    : key === 'value'
    ? 'Valor'
    : key === 'amount'
    ? 'Quantidade'
    : key === 'plate'
    ? 'Placa'
    : key === 'VehicleTypeId'
    ? ''
    : key === 'exit'
    ? 'Horario de Saida'
    : key === 'paidOut'
    ? 'Pago'
    : key === 'changeValue'
    ? 'Troco'
    : key === 'paidOutPrice'
    ? 'Preço Pago'
    : key === 'priceVehicle'
    ? 'Preço do estacionamento'
    : key === 'prohibited'
    ? 'Horario de Entrada'
    : '';
}

export function validationValues(value: string | number | boolean) {
  return typeof value === 'boolean'
    ? value
      ? 'Sim'
      : 'Não'
    : typeof value === 'number'
    ? value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    : value;
}
