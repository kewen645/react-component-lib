// npx jest .\jest.test.js
// npx jest .\jest.test.js --watch
// test('common matcher', () => {
//   expect(2 + 2).toBe(4)
//   expect(2 + 2).not.toBe(5)
// })

// test('truthness matcher', () => {
//   expect(1).toBeTruthy()
//   expect(0).toBeFalsy()
// })

// test('number', () => {
//   expect(4).toBeGreaterThan(3)
//   expect(2).toBeLessThan(3)
// })

// // toBe uses Object.is to test exact equality
// // wanna check the value of an object, use toEqual
// test('object', () => {
//   // expect({name: 'ryan'}).toBe({name: 'ryan'})
//   expect({ name: 'ryan' }).toEqual({ name: 'tom' })
// })

