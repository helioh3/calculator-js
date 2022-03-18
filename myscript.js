(function (doc, win) {
  'use strict'

  let $visor = doc.querySelector('[data-js="visor"]')
  let $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]')
  let $buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]')
  const $buttonCE = doc.querySelector('[data-js="button-ce"]')
  const $buttonEqual = doc.querySelector('[data-js="button-equal"]')

  function initialize () {
    initEvents()
  }

  function initEvents () {
    Array.prototype.forEach.call($buttonsNumbers, (button) => {
      button.addEventListener('click', handleClickNumber, false)
    })
    Array.prototype.forEach.call($buttonsOperations, function (button) {
      button.addEventListener('click', handleClickOperation, false)
    })
    $buttonCE.addEventListener('click', handleClickCE, false)
    $buttonEqual.addEventListener('click', handleClickEqual, false)
  }

  function handleClickNumber (event) {
    $visor.value += this.value
  }

  function handleClickOperation () {
    $visor.value = removeLastItemIsOperator($visor.value)
    $visor.value += this.value
  }

  function handleClickCE (event) {
    $visor.value = 0
  }

  function isLastItemOperation (number) {
    const operations = getOperations()
    let lastItem = number.split('').pop()
    return operations.some((operator) => {
      return operator === lastItem
    })
  }

  function getOperations () {
    return Array.prototype.map.call($buttonsOperations, function (button) {
      return button.value
    })
  }

  function removeLastItemIsOperator (string) {
    if (isLastItemOperation(string)) return string.slice(0, -1)
    return string
  }

  function handleClickEqual () {
    $visor.value = removeLastItemIsOperator($visor.value)
    const allValues = $visor.value.match(/\d+[+x÷-]?/g)
    $visor.value = allValues.reduce(calculateAllValues)
  }

  function calculateAllValues (accumulated, current) {
    const firstValue = accumulated.slice(0, -1)
    const operator = accumulated.split('').pop()
    const lastValue = removeLastItemIsOperator(current)
    const lastOperator = isLastItemOperation(current) ? current.split('').pop() : ''
    return doOperation(operator, firstValue, lastValue) + lastOperator
  }

  function doOperation (operator, firstValue, lastValue) {
    switch (operator) {
      case '+' :
        return Number(firstValue) + Number(lastValue)

      case '-' :
        return Number(firstValue) - Number(lastValue)

      case 'x' :
        return Number(firstValue) * Number(lastValue)

      case '÷' :
        return Number(firstValue) / Number(lastValue)
    }
  }

  initialize()

  // function myFunction () {
  //   arguments.forEach(function (arg){
  //     console.log(arg)
  //   })
  // }

})(document, window)
