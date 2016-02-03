// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Link,
  ListItem,
  List,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  dag: require("../assets/dag.png"),
  dag2: require("../assets/dag2.png"),
  dag3: require("../assets/dag3.png"),
  dag4: require("../assets/dag4.png"),
  dag5: require("../assets/dag5.png"),
  dag6: require("../assets/dag6.png"),
  dag7: require("../assets/dag7.png"),
  trie: require("../assets/trie.png")
};

const sample = function (fileName, ext = "js") {
  return require(`raw!../assets/${fileName}.${ext}`)
    .replace("\"use strict\";\n\n", "")
    .replace("\'use strict\';\n\n", "");
};

preloader(images);

const theme = createTheme({
  primary: "#ff4081",
  code: "#2d2d2d"
});

const Code = ({fileName, ext}) =>
  <CodePane
    lang="js"
    source={sample(fileName, ext)}
    margin="20px auto"
    style={{
      fontSize: "1.1em"
    }}
  />;

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="primary" notes={`
            <ul>
              <li>Interface developer
              <li>Co-founder of Strobe, a development team based in Manchester
              <li>This talk is about application data
              <ul>
                <li>The so-called state of data in JavaScript today
                <li>How to improve it with Immutable.js
            `}
          >

            <Heading size={1} fit caps lineHeight={1} textColor="black">
              Intro to
            </Heading>
            <Heading size={1} fit caps>
              Immutable
            </Heading>
            <Heading size={1} fit caps textColor="black">
              Efficient Immutability in JavaScript
            </Heading>


            <Link href="https://github.com/FormidableLabs/spectacle">
              <Text margin="50px auto" bold textColor="tertiary">A talk by @joecritchley</Text>
            </Link>

          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={`
            <ul>
              <li>First up...
              <li>Let's look at what object mutation is and why its annoying
            `}
          >
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Object Mutation
            </Heading>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              and why it’s annoying
            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>Mutation is changing an object after it has been created.
              <li>Notice the lack of new object when we mutate the firstName property.
              <li>It\'s still the same object in memory.
              <li>This is very common in JavaScript, as that\'s how its Object API works by default.
            </ul>
            `}
          >
            <Heading fit>
              Mutating an object
            </Heading>

            <Code fileName="changing-an-object" />
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>Persistence is useful: it refers to accessing previous values as well as the current value.
              <li>JS struggles with object persistence.
              <li>Even with assigning a variable before mutation, obj1 changes with obj2
              <li>That\'s because all Object variables in JS are assigned to their reference, not their value.
            </ul>
            `}
          >
            <Heading fit>No persistence :(</Heading>
            <Fill>
            <CodePane
              lang="js"
              source={sample("storing-previous-objects")}
              margin="50px auto"
              style={{
                fontSize: "1em"
              }}
            />
            </Fill>
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>Even worse...
              <li>If you pass an object to a third-party function
              <li>Anything could happen to it (someone might delete some properties, etc.)
              <li><i>See example</i>
              <li>Pete Hunt calls shared mutable state "the root of all evil"
            `}
          >
            <Heading fit>Side effects :(</Heading>
            <Fill>
            <CodePane
              lang="js"
              source={sample("side-effects")}
              margin="50px auto"
              style={{
                fontSize: "1em"
              }}
            />
            </Fill>
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>Primitive values (strings, integers, basically anything that's not an object, remembering that arrays are objects too)
              <li>Primitives are immutable; they <strong>cannot be changed after they are created</strong>.
              <li>If you want to change a primitive value, you will be returned a new value.
              <li><i>See example</i>
              <li>So methods on primitives do not mutate the original.
              <li>Allows you to keep hold of the original value.
              <li>This trivially allows persistence and a lack of side-effects
              <li>Lovely.
            `}
          >
            <Heading fit>
              Immutable primitives
            </Heading>
            <Code fileName="changing-a-string" />
          </Slide>
          <Slide transition={["slide", "fade"]} bgColor="black" notes={`
            <ul>
              <li>Can we apply the principles from primitive values to objects?
              <li>Can we overcome these issues natively?
              <li>Do immutable objects exist in JavaScript?
            `}
          >
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Immutable
            </Heading>
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              objects?
            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>Before we look at Immutable.js, lets look at our other options
              <li>To get around mutatation, we can shallow-clone objects
              <li>jQuery has an implementation of this, as does <span style="color: yellow">ES2015</span>
              <li><span style="color: yellow">Redux</span>'s examples work this way. This is pretty legit.
              <li>Helps with persistence, as we can access the unmodified "obj1"
              <li>But the objects themselves are still mutable.
            `}
          >
            <Heading size={2} fit textColor="white">
              Cloning objects
            </Heading>
            <Code fileName="cloning-objects" />
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>ES2015 can freeze objects, making them immutable on runtime
              <li>In strict mode, attempting to mutate an object will throw an error
              <li>But... only available in ES2015.
              <li>+ it is only by convention, Objects might be frozen, might not
            `}
          >
            <Heading size={2} fit textColor="white">
              Freezing objects
            </Heading>
            <Code fileName="freezing-objects" />
          </Slide>
          <Slide transition={["fade"]} notes={`
            <ul>
              <li>And that is an issue.
              <li>Clojure's data structures are completely immutable, so you can make guarantees across your codebase.
              <li>And here's what the creator of Clojure, the super clever Rich Hickey, said:
              <li><i style="color: yellow">Read quote</i>
              <li>Unfortunately, JavaScript has exactly that—a mixed API
            `}
          >
            <BlockQuote textColor="white">
              <Quote textColor="white" style={{borderColor: "#fff"}}>There’s no such thing as a convention of immutability. If it offers a mixed API, it’s simply not immutable.</Quote>
              <Cite>Rich Hickey, creator of Clojure</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={`
            <ul>
              <li>We want to make those guarantees in our JavaScript
              <li>Immutable.js is a solution to this problem, with its immutable API</li>
              <li>So let's take a look at it...
            `}
          >
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Immutable.js:
            </Heading>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              The interface
            </Heading>
          </Slide>
          <Slide bgColor="primary" transition={["fade"]} notes={`
            <ul>
              <li>But first...
              <li>What is Immutable.JS exactly?
            `}
          >
            <Heading fit size={2} textColor="white">What is Immutable.js?</Heading>
            <List>
              <Appear><ListItem>A library by Lee Byron, an engineer from Facebook</ListItem></Appear>
              <Appear><ListItem>Completely standalone (no React dependency or anything)</ListItem></Appear>
              <Appear><ListItem>A fully immutable API, with new data types</ListItem></Appear>
            </List>
          </Slide>
          <Slide bgColor="code" transition={["fade"]} notes={`
            <ul>
              <li>How do we handle objects with Immutable?
              <li>We use Maps. We can pass initial values into a Map as a plain object.
              <li>But what's returned is a custom instance.
              <li>And when we set anything on this value, instead of mutating it, we get a new one.
              <li>Just like primitive values.
              <li>No longer referentially equal.
              <li>And we have persistent data.
            `}
          >
            <Code fileName="objects-like-primitives" />
          </Slide>
          <Slide bgColor="code" transition={["fade"]} notes={`
            <ul>
              <li>What about arrays?
              <li>We use the List type instead.
              <li>With JS arrays, the push method is mutative.
              <li>In an Immutable List, its of course immutable. So you get a new value returned.
            `}
          >
            <Code fileName="immutable-example-2" />
          </Slide>
          <Slide bgColor="code" transition={["fade"]} notes={`
            <ul>
              <li>JS does have a few non-mutative methods, such as map and filter
              <li>And Immutable works in a compatible fashion
              <li>The only difference being that you have to use the <strong>get</strong> method when accessing properties
              <li>The "includes" method is pretty nice too, which is similar to the recently spec'd ES2016 method
            `}
          >
            <Code fileName="immutable-iteration" ext="es6" />
          </Slide>
          <Slide bgColor="code" transition={["fade"]} notes={`
            <ul>
              <li>How do we handle nested structures?
              <li>In a mutable object, we could just use dot notation to walk the path of the obect.
              <li>But you now know why that's bad.
              <li>The other option is to do nested object cloning. This is super messy.
              <li>Immutable offers a very expressive way to walk the path and return a new structure.
            `}
          >
            <Code fileName="immutable-deep" ext="es6" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={`
            <ul>
              <li>So that's a quick look at the common Iterable types in Immutable
              <li>Before we look into the benefits of using Immutable, lets see how it works under the hood
            `}
          >
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Immutable.js:
            </Heading>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              The implementation
            </Heading>
          </Slide>
          <Slide bgColor="code" transition={["fade"]} bgImage={images.dag.replace("/", "")} />
          <Slide bgColor="code" transition={["fade"]} bgImage={images.dag2.replace("/", "")} />
          <Slide bgColor="code" transition={["fade"]} bgImage={images.dag3.replace("/", "")} />
          <Slide bgColor="code" transition={["fade"]} bgImage={images.dag4.replace("/", "")} />
          <Slide bgColor="code" transition={["fade"]} bgImage={images.dag5.replace("/", "")} />
          <Slide bgColor="code" transition={["fade"]} bgImage={images.dag6.replace("/", "")} />
          <Slide bgColor="code" transition={["fade"]} bgImage={images.dag7.replace("/", "")} />
          <Slide bgColor="code" transition={["fade"]} bgImage={images.trie.replace("/", "")} bgDarken={0.5}>
            <Heading size={2} textColor="white">Tries</Heading>
            <Text fit textColor="white"><Link textColor="white" href="https://youtu.be/I7IdS-PbEgI?t=5m18s">
              https://youtu.be/I7IdS-PbEgI?t=5m18s
            </Link></Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Some Benefits
            </Heading>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              with a demo
            </Heading>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary">
            <Heading size={2} caps fit textColor="white" textFont="primary">
              Performance
            </Heading>
            <Text><Link textColor="white" href="https://github.com/teamstrobe/watchlist/compare/immutable">View demo</Link></Text>
          </Slide>
          <Slide transition={["fade"]} bgColor="primary">
            <Heading size={2} caps fit textColor="white" textFont="primary">
              Persistence
            </Heading>
            <Text><Link textColor="white" href="http://www.macwright.org/2015/05/18/practical-undo.html">View demo</Link></Text>
          </Slide>
          <Slide bgColor="black" transition={["slide"]}>
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Further Exploration
            </Heading>
            <List>
              <Appear><Heading size={3} textColor="white">Articles</Heading></Appear>
              <Appear><ListItem textColor="primary"><Link textColor="primary" href="http://jlongster.com/Using-Immutable-Data-Structures-in-JavaScript">Using Immutable Data Structures in JavaScript</Link></ListItem></Appear>
              <Appear><ListItem textColor="primary"><Link textColor="primary" href="http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/">Pros and Cons of Immutability in React JS</Link></ListItem></Appear>
              <Appear><ListItem textColor="primary"><Link textColor="primary" href="http://codequarterly.com/2011/rich-hickey/">Rich Hickey on Immutability</Link></ListItem></Appear>
              <Appear><Heading size={3} textColor="white">Libraries/proposals</Heading></Appear>
              <Appear><ListItem textColor="primary"><Link textColor="primary" href="https://github.com/rtfeldman/seamless-immutable">seamless-immutable</Link></ListItem></Appear>
              <Appear><ListItem textColor="primary"><Link textColor="primary" href="http://swannodette.github.io/mori/">mori</Link></ListItem></Appear>
              <Appear><ListItem textColor="primary"><Link textColor="primary" href="http://ramdajs.com/0.19.1/index.html">Ramda</Link></ListItem></Appear>
              <Appear><ListItem textColor="primary"><Link textColor="primary" href="https://github.com/sebmarkbage/ecmascript-immutable-data-structures">ECMAScript Immutable Data Structures</Link></ListItem></Appear>
            </List>
          </Slide>
          <Slide bgColor="primary" transition={["slide"]}>
            <Heading size={3} caps fit textColor="white" textFont="primary">
              Cheers.
            </Heading>
            <Text fit bold>Questions — @joecritchley</Text>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
