import React, {Component} from 'react'
import '../css/Help.css'

export default class Header extends Component {
  render () {
    return (
      <div className="help__container">
        <article className="help">
          <h1>What the heck is this thing?</h1>
          <p className="help__main-description">
            Odds.cool lets you run a weighted lottery like they do in the NBA
            and NHL where teams can have accurate odds as low as 0.1%
          </p>
          <h2>What do I need to do?</h2>
          <ol className="help-steps__list">
            <li>
              You need items that can be randomly drawn and numbered 1 through
              14. In the SBBHL we use 14 ping pong balls in a bingo spinner. You
              could easily number 14 pieces of paper and put them in a hat. You
              could number pigs and let them race. Who cares?
            </li>
            <li>
              You need to figure out your probabilities. The NBA uses the
              following:{' '}
              <i>25.0 19.9 15.6 11.9 8.8 6.3 4.3 2.8 1.7 1.1 0.8 0.7 0.7 0.5</i>
              <br />
              You may not have that many teams. The SBBHL uses:{' '}
              <i>30.0 22.0 16.0 11.5 8.0 5.5 4.0 3.0</i>
              <br />
              You can do whatever you want, they just all need to add up to
              100%.
              <em>
                Tip: if all your teams have the same odds you don't need this
                thing at all.
              </em>
            </li>
            <li>
              Enter your teams and probabilities into Odds.cool's Setup and
              click 'Ready'
            </li>
            <li>
              Draw your 4 numbers. Draw them one at a time and input the number
              into Odds.cool's Draw screen by clicking on the number you drew.
              Watch your teams' chances at winning update live right up until
              the 4th number declares the winner.
            </li>
          </ol>
          <h2>What's "Re-draw"?</h2>
          <p>
            Because of the math there is one combination of balls that will
            result in no winner. If this happens you just have to start over.
            There's a 1 in 1001 chance this will happen. I've never seen it in
            my testing. If you get a legit one let me know!
          </p>
          <h2>What's the "Game Stage"?</h2>
          <p>
            You can click them to go back in time to see how the odds adjusted
            as you drew balls. You can't draw a ball while you're in the past
            though—if you want to do that you'll need to 'Undo'.
          </p>
          <h2>Why does this look like garbage on my computer?</h2>
          <p>
            Odds.cool uses the most advanced web technologies and only works in
            the best browsers (ie. Chrome, maybe Safari and Firefox). I deal
            with garbage browsers all day at work, I'm not going to acommodate
            them in my spare time. Oh also, I haven't made decent mobile styles
            yet—for this I am sorry!
          </p>
        </article>
      </div>
    )
  }
}
