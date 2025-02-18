# Everything about Component in Angular

# 1. What is Component?
Angular utilizes components as the building block of entire application. It represents a reusable peace of the UI. Component is responsible for rendering the view and handling the logic. There are four parts of a component:

  - Component class: Where the component logic was defined and includes method and data used in the component.
  - Template: Define how the component will be rendered in the UI, using HTML.
  - Style: Define how the UI looks.
  - Metadata: essential information about component that will be used by angular to determine how the component will be processed and used.

----
**Note**: 
  - Component is a special directive with a template.
  - Interpolate: `{{value}}` to inject data into the template.
  - All Angular Component begins as a class. This class instantiate the component and all the data using inside the template is accessible from class's properties.
---


# 2. How to create a Component?
The component could generally be defined by 2 peace: the core class definition and the class decoration.

  - Class definition: This class is used to instantiate the component, all the data and method/function using in the template is accessible from the class's properties.
  - Component decorator: `@Component` applies the metadata to the class and define what the class represents in Angular. `@Decorator` defined metadata such as selector, template, styles,etc...

# 3. Passing data into a Component
In Angular, we can use `@Input` decorator to define the property that parent component brings into the child component. This decorator is used inside the class component.
```
@Input ({
  alias?: string | undefined;
  required?: boolean | undefined;
  transform?: ((value: any) => any) | undefined;
})
```

There is an importance difference between AngularJS and Angular that in Angular 2 `@Input` is a unidirectional data binding. It means the data updates will flow downward and the parent will not be updates unless explicitly notified.

