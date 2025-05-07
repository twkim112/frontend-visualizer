II. Interactive Visual Effects & Animations
Beyond static structure, interactive effects and animations enhance user engagement, provide feedback, and improve the perceived quality of an interface.

A. CSS-Driven Transitions & Static Animations
CSS offers powerful yet relatively simple ways to add motion and interactivity, often with performance benefits due to potential hardware acceleration.

1.  **CSS Transitions (CSS Easing):** Enable smooth changes between an element's states (e.g., from one style to another) over a specified duration. They are triggered by changes in CSS properties (e.g., on hover or focus) and control aspects like the property to animate, duration, timing function (easing curve like `linear`, `ease-in-out`), and delay.

2.  **CSS Keyframe Animations (CSS Animations):** Define complex, multi-step animations using `@keyframes` rules. These allow for more intricate sequences than simple transitions, such as spinning, pulsing, bouncing, or fading elements through multiple stages. Properties like `animation-name`, `animation-duration`, and `animation-iteration-count` control their behavior.

3.  **Hover Effects (Mouseover Effect, Rollover Effect):** Visual changes triggered when a user's mouse cursor hovers over an interactive element. These effects typically use CSS transitions or keyframe animations on the `:hover` pseudo-class to provide feedback, indicate interactivity, or reveal additional information.

4.  **Basic Transformations (2D/3D - CSS Transforms):** The CSS `transform` property allows elements to be scaled, rotated, translated (moved), and skewed in 2D or 3D space. These transformations are often combined with CSS transitions or animations to create dynamic visual effects like card flips, zoom effects, or icon animations.
    * **2D Transforms:** Operations like `scale()`, `rotate()`, `translate()`, `skew()` on a two-dimensional plane.
    * **3D Transforms:** Operations that add depth, such as `rotateX()`, `rotateY()`, `translateZ()`, and using the `perspective` property to create a sense of 3D space.
