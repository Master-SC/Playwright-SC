
module.exports = {
  default: {
    requireModule: ['tsx'], // or ['ts-node/register']
    paths: ['features/*.feature'],
    require: [
        'features/step_definitions/*.ts',
        'features/support/*.ts'
    ]
  }
};