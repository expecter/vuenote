function getTlEvent () {
  if (!localStorage.tlEventName) {
    return []
  }
  var events = []
  var tlEvent = localStorage.tlEventName.split(',')
  for (let eventName in tlEvent) {
    var eventData = (localStorage[tlEvent[eventName]]).split(',')
    if (eventData[0]) {
      events.push([
        eventData[0],
        eventData[1],
        eventData[2],
        eventData[3]
      ])
    }
  }
  return events
}
function addEvent (eventData) {
  var eventName = 'evN_1'
  if (localStorage.tlEventName) {
    var tlEvent = localStorage.tlEventName.split(',')
    var lastElement = tlEvent[tlEvent.length - 1]
    var tlIndex = lastElement.split('_')
    var nextIndex = parseInt(tlIndex[1]) + 1
    eventName = 'evN_' + nextIndex
    tlEvent.push(eventName)
    localStorage.tlEventName = tlEvent
  } else {
    localStorage.tlEventName = [eventName]
  }
  localStorage[eventName] = eventData
  // 分发更新缓存事件
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
}
function updateEvent (eventName, eventData) {
  localStorage[eventName] = eventData
  // 分发更新缓存事件
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
}
function deleteEvent (eventName) {
  if (localStorage.tlEventName) {
    var tlEvent = localStorage.tlEventName.split(',')
    tlEvent.splice(tlEvent.indexOf(eventName), 1)
    localStorage.tlEventName = tlEvent
  }
  localStorage.removeItem(eventName)
  let setEvent = new Event('setItemEvent')
  window.dispatchEvent(setEvent)
}
export {
  getTlEvent,
  addEvent,
  updateEvent,
  deleteEvent
}
