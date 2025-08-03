# PhD Academic Website

A modern, responsive academic website designed for PhD students, fully compatible with GitHub Pages.

## 🚀 Features

- **Clean, Professional Design**: Modern academic styling with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Tab Navigation**: Easy switching between Home and Blog sections
- **Publication Management**: Organized display of your research papers
- **Blog Integration**: Built-in blog with multiple posts
- **GitHub Pages Ready**: No build process required, works out of the box
- **Interactive Elements**: 
  - Smooth scrolling
  - Copy-to-clipboard for BibTeX citations
  - Search functionality (Ctrl+F)
  - Keyboard shortcuts (Alt+1 for Home, Alt+2 for Blog)
  - Scroll animations

## 📁 File Structure

```
website_2025/
├── index.html          # Main webpage
├── style.css           # Styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🛠️ Customization Guide

### 1. Personal Information

Edit the following sections in `index.html`:

**Profile Section** (around line 20-45):
```html
<h1 class="name">Your Name</h1>
<p class="title">PhD Student in [Your Field]</p>
```

**Contact Links** (around line 30-40):
- Update email, LinkedIn, GitHub, and Google Scholar URLs
- Replace placeholder URLs with your actual profiles

**Profile Image**:
- Replace the placeholder image URL in the `<img>` tag
- Recommended size: 200x200px
- Supported formats: JPG, PNG, GIF

### 2. About Section

Update your research description (around line 60-75):
```html
<p>
    I am a PhD student at Fraunhofer Heinrich Hertz Institute (HHI), where I work under the supervision of 
    Prof. Wojciech Samek. My research focuses on [Your Research Area]...
</p>
```

### 3. Research Interests

Modify the research interests grid (around line 80-110):
- Change icons using Font Awesome classes
- Update titles and descriptions
- Add or remove interest items as needed

### 4. Publications

Replace the example publications (around line 120-200):

```html
<div class="publication">
    <h3>Your Paper Title</h3>
    <p class="authors"><strong>Your Name</strong>, Co-Author Name</p>
    <p class="venue">Conference/Journal Name 2024</p>
    <p class="description">Brief description of your paper...</p>
    <div class="publication-links">
        <a href="link-to-pdf.pdf" class="pub-link">
            <i class="fas fa-file-pdf"></i> PDF
        </a>
        <!-- Add more links as needed -->
    </div>
</div>
```

### 5. Blog Posts

Update blog content (around line 250 onwards):
- Modify existing blog posts
- Add new blog posts by duplicating the structure
- Update navigation buttons accordingly

### 6. Styling Customization

In `style.css`, you can customize:

**Colors**: Change the primary color scheme by updating the `#667eea` values throughout the file

**Fonts**: Modify the font family in the `body` selector

**Layout**: Adjust spacing, sizing, and responsive breakpoints

## 🚀 Deployment to GitHub Pages

### Option 1: Quick Setup

1. **Create a new repository** on GitHub named `[your-username].github.io`
2. **Upload your files**:
   - `index.html`
   - `style.css`
   - `script.js`
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
4. **Access your site** at `https://[your-username].github.io`

### Option 2: Project Repository

1. **Create a new repository** with any name
2. **Upload your files** to the repository
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select source and branch
4. **Access your site** at `https://[your-username].github.io/[repository-name]`

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🔧 Advanced Features

### Search Functionality
- Press `Ctrl+F` (or `Cmd+F` on Mac) to search through publications
- Press `Escape` to close search

### Keyboard Shortcuts
- `Alt+1`: Switch to Home tab
- `Alt+2`: Switch to Blog tab

### BibTeX Copy
- Click on "BibTeX" links to copy citations to clipboard
- Update the BibTeX content in `script.js` (around line 130)

## 📄 Adding More Content

### Adding Publications
1. Copy an existing publication `<div class="publication">` block
2. Update the content with your paper details
3. Add appropriate links (PDF, Code, BibTeX)

### Adding Blog Posts
1. Create a new blog post article:
```html
<article id="blog3" class="blog-post">
    <h2>Your Blog Title</h2>
    <p class="blog-meta">Published on Date</p>
    <!-- Your content here -->
</article>
```
2. Add a navigation button:
```html
<button class="blog-nav-btn" onclick="showBlog('blog3')">Blog Post 3</button>
```

## 🎨 Color Scheme

The website uses a professional blue-purple gradient theme:
- Primary: `#667eea`
- Secondary: `#764ba2`
- Text: `#2d3748`
- Background: `#f5f7fa` to `#c3cfe2`

## 📞 Support

If you need help customizing your website:
1. Check the comments in the HTML/CSS/JS files
2. Refer to this README
3. Use browser developer tools to inspect elements
4. Test changes locally before deploying

## 📝 License

This template is free to use and modify for academic purposes.

---

**Happy coding and good luck with your PhD journey! 🎓** 