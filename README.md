# Civet
## What is Civet?
![An Asian palm
civet](https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Asian_Palm_Civet_Over_A_Tree.jpg/1024px-Asian_Palm_Civet_Over_A_Tree.jpg)

A civet is a smaller relative of the mongoose. Similarly, Civet is a smaller
relative of Mongoose (which we use to interact with Mongo), as in it's a small, lightweight ORM that exposes some of
the same methods as Mongoose, especially as relate to collection-level CRUD.

## Why is Civet?
Civet exists because it can be useful to play around with Express without first
learning all of the ins and outs of Mongo and Mongoose. Sometimes you just want
to be able to get started quickly, store your records in memory, and worry about
persistence later.

Specifically, this was put together as a sort of "training lightsaber" for the
younglings in General Assembly's Web Development Intensive. _Hi, WDI DTLA 6!_

## How is Civet?
> I'm good– how are you? 

First, install Civet on your project:

```
npm install --save civet-orm
```

In your `app.js` (or wherever else you're going to want to use Civet):

```js
var civetInstance = require('civet-orm');
```
Note that above, the variable name `civetInstance` can be whatever you want it
to be– I'm using `civetInstance` so that we're perfectly clear what it is I'm
talking about.

### `Civet#create`
The first method you'll want to use is `create`. `create` takes two arguments:
an object of the record you want to create, and a callback. The
_callback_, meanwhile, takes one argument: an error (if there is one). Here's a
simple example:

```js
civetInstance.create({foo: "bar"}, function(error){
  if(error) {
    console.log(error);
  }
});
```

After running this, your Civet's data store will have one element in it: the object `{foo: "bar", id: "1"}`. The `id` property was added by Civet– we'll see why in a second.

### `Civet#find`
Civet's `find` method returns all the records in its data store. This is something of a misnomer, but it's by design. In Mongoose, if you call `find` without specifying what you're looking for (as we're going to), it behaves similarly to ActiveRecord's `all` method– that is, it returns an array of all records. `find` takes only one argument: a callback function. The callback function takes two arguments: an __error__, and an array of __records__. Once again, let's see an example:

```js
civetInstance.find(function(error, records){
	if(error) {
		console.log(error);
	} else {
		console.log(records);
	}
});
```
If we run this after we run the code we have for `create`, we'd hopefully get `[{foo: "bar"}]`. 

### `Civet#findById`
`findById` does pretty much exactly what it says on the tin: you pass it an integer and a callback, it finds the record with that ID (set in `create`) and passes it to the callback. The method itself takes two arguments: an ID (as an integer), and a callback function (which, again, is called with an error and the record being returned). Again, let's look at an example:

```js
civetInstance.findById(1, function(error, record){
	if(error) {
		console.log(error);
	} else {
		console.log(record);
	}
});
```
Calling this after the code we wrote above would log `{foo: "bar"}` out to console. `find` does double duty: we can also update our record within the callback:

```js
civetInstance.findById(1, function(error, record){
	if(record) {
		record.baz = "wab";
	}
});
```
If we look at the record now, it would be `{foo: "bar", baz: "wab"}`. Because this is all in memory, we don't need to save anything– it'll update immediately. This changes in Mongoose, but we'll cross that bridge when we come to it.

### `Civet#remove`
We've created, we've read (two ways), we've updated– now, it's time to delete. The `remove` method takes two arguments: the ID of the record to be deleted, and a callback to run after it deletes. The callback takes the customary `error`, but you can also give it the record you just deleted, in case you want to say goodbye. Again, let's see an example:

```
civetInstance.remove(1, function(error, record){
	if(error) {
		console.log(error);
	} else {
		console.log("Good riddance, " + record + "!");
	}
});
```
