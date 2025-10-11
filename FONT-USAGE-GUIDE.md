# Font Usage Guide

## Available Fonts

Your wedding website now has the following fonts available:

### Original Fonts
1. **Great Vibes** - Script font (cursive)
2. **Cormorant Garamond** - Serif font for headings
3. **Inter** - Sans-serif font for body text

### New Fonts (Just Added)
4. **Dancing Script** - Script font (cursive)
5. **Lora** - Serif font
6. **Abril Fatface** - Display serif font

## How to Use the Fonts

### Method 1: Using CSS Classes

You can use these CSS classes in any component:

```jsx
// Dancing Script (cursive)
<h1 className="font-dancing-script text-4xl">Thanh An & Thanh Ngân</h1>

// Lora (serif)
<p className="font-lora text-lg">Elegant serif text for paragraphs</p>

// Abril Fatface (display serif)
<h2 className="font-abril-fatface text-5xl">Wedding Day</h2>
```

### Method 2: Using CSS Variables

You can also use the CSS variables directly:

```jsx
<div style={{ fontFamily: 'var(--font-dancing-script)' }}>
  Beautiful Script Text
</div>

<div style={{ fontFamily: 'var(--font-lora)' }}>
  Elegant Serif Text
</div>

<div style={{ fontFamily: 'var(--font-abril-fatface)' }}>
  Bold Display Text
</div>
```

### Method 3: Using Tailwind's Font Classes

You can combine with Tailwind utilities:

```jsx
<h1 className="font-dancing-script text-6xl font-normal text-[#fc5d01]">
  Save The Date
</h1>

<p className="font-lora text-base leading-relaxed">
  We are delighted to invite you to our wedding celebration
</p>

<h2 className="font-abril-fatface text-7xl tracking-tight">
  October 15, 2025
</h2>
```

## Font Characteristics

### Dancing Script
- **Style**: Cursive, flowing, handwritten
- **Best for**: Names, romantic headings, invitations
- **Weights**: Variable (supports multiple weights)

### Lora
- **Style**: Serif, elegant, readable
- **Best for**: Body text, paragraphs, descriptions
- **Weights**: 400, 500, 600, 700

### Abril Fatface
- **Style**: Display serif, bold, dramatic
- **Best for**: Large headings, titles, emphasis
- **Weight**: 400

## Example Usage in Components

### Example 1: Hero Section
```jsx
<div className="text-center">
  <h1 className="font-abril-fatface text-8xl text-[#fc5d01] mb-4">
    Wedding Day
  </h1>
  <p className="font-dancing-script text-5xl mb-8">
    Thanh An & Thanh Ngân
  </p>
  <p className="font-lora text-xl">
    Join us in celebrating our love story
  </p>
</div>
```

### Example 2: Invitation Card
```jsx
<div className="wedding-card p-8">
  <h2 className="font-dancing-script text-4xl text-center mb-4">
    You're Invited
  </h2>
  <p className="font-lora text-lg text-center">
    We would be honored to have you celebrate with us
  </p>
  <h3 className="font-abril-fatface text-3xl text-center mt-6">
    October 15, 2025
  </h3>
</div>
```

### Example 3: Timeline Section
```jsx
<div className="space-y-4">
  <h3 className="font-abril-fatface text-2xl text-[#fc5d01]">
    Our Love Story
  </h3>
  <p className="font-lora text-base leading-relaxed">
    Every great love story has a beginning...
  </p>
</div>
```

## Font Combinations

### Romantic & Elegant
- **Heading**: Dancing Script
- **Subheading**: Abril Fatface
- **Body**: Lora

### Modern & Bold
- **Heading**: Abril Fatface
- **Subheading**: Lora (bold)
- **Body**: Inter

### Classic & Traditional
- **Heading**: Abril Fatface
- **Subheading**: Cormorant Garamond
- **Body**: Lora

## Tips for Using New Fonts

1. **Don't overuse script fonts** - Use Dancing Script sparingly for maximum impact
2. **Abril Fatface is bold** - Use it for large headings only, not body text
3. **Lora is versatile** - Great alternative to Inter for more elegant body text
4. **Test readability** - Ensure text is readable at different sizes
5. **Match with colors** - These fonts work beautifully with your orange wedding theme

## Color Combinations

Use these fonts with your wedding colors:

```jsx
// Orange gradient with Dancing Script
<h1 className="font-dancing-script text-6xl wedding-text-gradient">
  Beautiful Heading
</h1>

// Orange text with Abril Fatface
<h2 className="font-abril-fatface text-5xl text-[#fc5d01]">
  Bold Title
</h2>

// Subtle text with Lora
<p className="font-lora text-gray-700">
  Elegant paragraph text
</p>
```

## Ready to Use!

All fonts are now automatically loaded and ready to use throughout your website. Simply add the CSS classes to any component!
