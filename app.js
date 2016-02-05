import R from 'ramda'
import {
    Observable
} from 'rx'
import {
    run
} from '@cycle/core'
import {
    div,
    label,
    button,
    input,
    hr,
    h1,
    makeDOMDriver
} from '@cycle/dom'

const vtree = i =>
    div([
        button('.incr', '+'),
        button('.decr', '-'),
        div(String(i))
    ])

const count$ = ([incrClick$, decrClick$]) => {
    const map = R.compose(R.map, R.always)
    const action$ = Observable.merge(
        map(-1)(decrClick$),
        map(+1)(incrClick$)
    )
    return action$.startWith(0).scan(R.add)
}

const main = sources => ({
    DOM: R.map(vtree, count$([
        sources.DOM.select('.incr').events('click'),
        sources.DOM.select('.decr').events('click')
    ]))
})

run(main, {
    DOM: makeDOMDriver('#app')
})
