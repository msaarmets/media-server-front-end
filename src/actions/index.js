export function setWindowHeight(height){
    // getWindowHeight is an ActionCreator, it needs to return an action,
    // an object with a type property.
    return {
        type: 'WINDOW_HEIGHT',
        payload: height
    }
}
