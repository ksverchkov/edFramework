# edFramework - Efficient Development Framework

The edFramework, which stands for "Efficient Development Framework," is a lightweight JavaScript frontend framework designed to enhance the development process of web applications. It provides developers with essential features and tools to build dynamic and interactive web pages with ease and efficiency.

With a focus on streamlining development tasks, the edFramework offers built-in functionalities such as routing, template rendering, component management, and addon integration. These features enable developers to create web applications more efficiently by reducing the amount of boilerplate code and providing organized structures for code organization.

By leveraging the edFramework, developers can concentrate on their application's logic and functionality, rather than spending excessive time on repetitive implementation details. Its intuitive and straightforward approach empowers developers to create robust and dynamic web experiences without compromising development speed and efficiency.

Whether you're building a small website or a complex web application, the edFramework provides the necessary tools and patterns to facilitate efficient development and deliver high-quality results.

# Usage
To use edFramework, follow these steps:

Create a new instance of the framework:
```javascript
const edFramework = {
  routes: {},
  templates: {},
  addons: [],
  handlers: {},
  components: {},
  // ...
};
```

Add routes using the `addRoute()` method. Routes define the path, associated template, and optional handler function:
```javascript
edFramework.addRoute('/home', 'homeTemplate', handleHome);
```

Add templates using the `addTemplate()` method. Templates are HTML strings with optional variables and loops:

```javascript
edFramework.addTemplate('homeTemplate', '<h1>Welcome to the Home Page</h1>');
```

Add addons using the `addAddon()` method. Addons are optional modules that enhance the framework's functionality:
```javascript
const myAddon = {
  init: function () {
    // Initialization logic for the addon
  },
};
edFramework.addAddon(myAddon);
```

Add event handlers using the `addHandler()` method. Event handlers define functions to be executed for specific events:
```javascript
edFramework.addHandler('click', handleClick);
```

Add components using the `addComponent()` method. Components are reusable templates that can be included in other templates:
```javascript
edFramework.addComponent('userComponent', '<p>User: {{name}}</p>');
```

Initialize the framework using the `init()` method:
```javascript
edFramework.init();
```

## Routing
Routing allows you to define different paths and associate them with templates and optional handler functions. The `addRoute()` method is used to add routes:

```javascript
edFramework.addRoute(path, templateName, handler);
path: The URL path for the route (e.g., '/home').
templateName: The name of the template associated with the route.
handler (optional): A function to be executed when the route is accessed.
```

## Templates
Templates are HTML strings that can include variables and loops. The `addTemplate()` method is used to add templates:

```javascript
edFramework.addTemplate(templateName, templateContent);
templateName: The name of the template.
templateContent: The HTML content of the template, which can include variables and loops.
```

Variables in templates are denoted by `{{variableName}}` syntax. Variables are replaced with their corresponding values during rendering.

Loops in templates are denoted by `{{#foreach loopData}}{{loopContent}}{{/foreach}}` syntax. The loop iterates over an array of loopData and repeats the loopContent for each item.

## Addons
Addons are optional modules that extend the functionality of the framework. An addon can be any object with an `init()` method. Addons can be added using the `addAddon()` method:

```javascript
edFramework.addAddon(addon);
addon: The addon object with an init() method.
```

## Handlers
Handlers are functions that are executed in response to specific events. You can add event handlers using the `addHandler()` method:

```javascript
edFramework.addHandler(eventName, handler);
eventName: The name of the event to listen for (e.g., 'click', 'submit', 'keydown').
handler: The function to be executed when the event occurs.
```

## Components
Components are reusable templates that can be included in other templates. Components are defined using the `addComponent()` method:

```javascript
edFramework.addComponent(componentName, componentContent);
```

* `componentName`: The name of the component.

* `componentContent`: The HTML content of the component.

Components can be referenced in templates using the `{{componentName}}` syntax. During rendering, the component will be inserted into the template.

## Initialization and Route Handling
Once all the routes, templates, addons, handlers, and components are added, you can initialize the framework using the init() method:

```javascript
edFramework.init();
```

The `init()` method performs the following tasks:
- Calls the `init()` method of each addon.
- Handles the initial route.
- Listens for changes in the URL hash and handles route changes accordingly.

When a route is accessed, the associated template is rendered, variables are replaced with their values, loops are processed, and the resulting HTML is inserted into the specified DOM element with the id `app`.

If a route does not exist, a "Route not found" message will be displayed in the `app` element.

## Example Usage

Here's an example that demonstrates the usage of edFramework:

```javascript
const homeTemplate = `
  <h1>Welcome to the Home Page</h1>
  <p>{{userComponent}}</p>
`;

const userComponent = `
  <p>User: {{name}}</p>
`;

function handleHome() {
  // Handler logic for the home route
}

function handleClick() {
  // Event handler logic for click events
}

edFramework.addRoute('/home', 'homeTemplate', handleHome);
edFramework.addTemplate('homeTemplate', homeTemplate);
edFramework.addComponent('userComponent', userComponent);
edFramework.addHandler('click', handleClick);
edFramework.init();
```
In this example, we define a home template that includes a reference to the `userComponent`. The `userComponent` is defined separately as a component. We also define a handler for the home route and an event handler for click events.

When the framework is initialized, the `homeTemplate` will be rendered, and the `userComponent` will be inserted into the template. Any click events will trigger the `handleClick` function.
