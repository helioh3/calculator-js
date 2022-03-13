(function (doc, win) {
  'use strict'

  let $visor = doc.querySelector('[data-js="visor"]')
  let $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]')
  let $buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]')
  const $buttonCE = doc.querySelector('[data-js="button-ce"]')
  const $buttonEqual = doc.querySelector('[data-js="button-equal"]')

  // console.log($buttonCE)
  // $buttonsNumbers.forEach((value) => {
  //   console.log(value)
  // })

  /*$buttonsNumbers.forEach(function (button){
    console.log(button)
  })*/

  Array.prototype.forEach.call($buttonsNumbers, (button) => {
    button.addEventListener('click', handleClickNumber, false)
  })

  Array.prototype.forEach.call($buttonsOperations, function (button) {
    button.addEventListener('click', handleClickOperation, false)
  })

  $buttonCE.addEventListener('click', handleClickCE, false)

  $buttonEqual.addEventListener('click', handleClickEqual, false)

  function handleClickNumber (e) {

    $visor.value += this.value
  }

  function handleClickOperation () {
    removeLastItemIsOperator()
    $visor.value += this.value
  }

  function handleClickCE (e) {
    $visor.value = 0
  }

  function isLastItemOperation () {
    const operations = ['+', '-', 'x', '÷', '=']
    let lastItem = $visor.value.split('').pop()

    return operations.some((operator) => {
      return operator === lastItem
    })
  }

  function removeLastItemIsOperator () {
    if (isLastItemOperation())
      $visor.value = $visor.value.slice(0, -1)
  }

  function handleClickEqual () {
    removeLastItemIsOperator()
    const allValues = $visor.value.match(/\d+[+x÷-]?/g)
    $visor.value = allValues.reduce(function (accumulated, current) {
      const firstValue = accumulated.slice(0, -1)
      const operator = accumulated.split('').pop()
      const lastValue = current
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

    })
  }

  // function myFunction () {
  //   arguments.forEach(function (arg){
  //     console.log(arg)
  //   })
  // }

})(document, window)
