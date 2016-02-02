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
              <li>Interface developer and co-founder of Strobe, a development team based in Manchester.
              <li>Will cover:
              <ul>
                <li>Why mutation can be a bad thing
                <li>Immutable data with Immutable.js
                <li>A couple of examples
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
              <li>Primitive values (strings, integers, basically anything that's not an object (remember arrays are objects in JS))
              <li>If you want to change a primitive value, you will be returned a new value.
              <li>So methods on primitives do not mutate the original.
              <li>Allows you to keep hold of the original value.
              <li>Lovely.
            `}
          >
            <Heading fit>
              Changing primitives
            </Heading>
            <Code fileName="changing-a-string" />
            <Text bold caps textColor="tertiary">(Not mutation)</Text>
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>Unfortunately...
              <li>JavaScript\'s Objects work differently.
              <li>You *can* mutate them.
              <li>Notice the lack of new object when we mutate the firstName property.
            </ul>
            `}
          >
            <Heading fit>
              Changing objects
            </Heading>

            <Code fileName="changing-an-object" />

            <Text bold caps textColor="tertiary">(Mutation)</Text>
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>Persistence refers to accessing both previous and current values.
              <li>JS struggles with that.
              <li>Even with assigning a variable before mutation... obj1 changes with obj2
              <li>That\`s because all Object variables in JS are assigned to their reference, not their value.
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
              <li>Similarly, comparing the value of two objects is difficult and slow
              <li>With the standard mutative API, we can't use === checks
              <li>Because they will always be equal because it is the same reference
            `}
          >
            <Heading fit>Comparing objects :(</Heading>
            <Fill>
            <CodePane
              lang="js"
              source={sample("comparing-objects")}
              margin="50px auto"
              style={{
                fontSize: "1em"
              }}
            />
            </Fill>
          </Slide>
          <Slide transition={["fade"]} bgColor="code" notes={`
            <ul>
              <li>The worst part.
              <li>If you pass a mutable object to a third-party function
              <li>Anything could happen to it.
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
          <Slide transition={["slide", "fade"]} bgColor="black" notes={`
            <ul>
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
              <li>We can shallow-clone objects (or even deep-clone, but thats expensive)
              <li>jQuery has an implementation of this, as does ES2015
              <li>This is pretty legit. Redux's examples work this way.
              <li>Enables persistence.
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
              <li>ES2015 can freeze objects
              <li>But this happens on runtime, which in strict mode, throws errors
              <li>Objects might be frozen, might not
              <li>Only available in ES2015. And still only by convention.
            `}
          >
            <Heading size={2} fit textColor="white">
              Freezing objects
            </Heading>
            <Code fileName="freezing-objects" />
          </Slide>
          <Slide transition={["fade"]} notes={`
            <ul>
              <li>A quote from the super clever Rich Hickey
              <li>Clojure's data structures are completely immutable.
              <li>So you can make guarantees across your codebase.
            `}
          >
            <BlockQuote textColor="white">
              <Quote textColor="white" style={{borderColor: "#fff"}}>There’s no such thing as a convention of immutability. If it offers a mixed API, it’s simply not immutable.</Quote>
              <Cite>Rich Hickey, creator of Clojure</Cite>
            </BlockQuote>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes={`
            <ul>
              <li>Immutable.js is a solution to this problem
              <li>A library by Lee Byron, an engineer from Facebook
              <li>Completely standalone, no React dependency
              <li>You can replace all your objects with Immutable's Maps and Lists
              <li>So you can make immutable guarantees, which means:
                <ul>
                  <li>Persistence
                  <li>Easy data comparison
                  <li>No side-effects
            `}
          >
            <Heading size={2} caps fit textColor="primary" textFont="primary">
              Immutable.js:
            </Heading>
            <Heading size={2} caps fit textColor="white" textFont="primary">
              The interface
            </Heading>
          </Slide>
          <Slide bgColor="code" transition={["fade"]}>
            <Code fileName="objects-like-primitives" />
          </Slide>
          <Slide bgColor="code" transition={["fade"]}>
            <Code fileName="immutable-example-2" />
          </Slide>
          <Slide bgColor="code" transition={["fade"]}>
            <Code fileName="immutable-iteration" ext="es6" />
          </Slide>
          <Slide bgColor="code" transition={["fade"]}>
            <Code fileName="immutable-deep" ext="es6" />
          </Slide>
          <Slide transition={["slide"]} bgColor="black">
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
            <Text fit textColor="white">https://youtu.be/I7IdS-PbEgI?t=5m18s</Text>
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
            <Text><Link textColor="white" href="http://www.macwright.org/2015/05/18/practical-undo.html">View demo</Link></Text>
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
