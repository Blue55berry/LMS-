// CSS property data
const cssProperties = [
  {
    name: "display",
    desc: "Controls the display behavior of elements, determining how they participate in layout flow.",
    syntax: "display: value",
    browser: "All modern browsers",
    example: {
      preview: `<div style="background:#4f8cff;color:#fff;padding:0.5rem 1rem;margin-bottom:0.5rem;">Block Element</div>
<div style="display:inline-block;background:#10b981;color:#fff;padding:0.5rem 1rem;">Inline Element</div>
<div style="display:inline-block;background:#10b981;color:#fff;padding:0.5rem 1rem;">Another Inline</div>
<div style="background:#4f8cff;color:#fff;padding:0.5rem 1rem;margin-top:0.5rem;">Another Block</div>`,
      html: `&lt;div&gt;Block Element&lt;/div&gt;
&lt;div style=\"display:inline-block\"&gt;Inline Element&lt;/div&gt;
&lt;div style=\"display:inline-block\"&gt;Another Inline&lt;/div&gt;
&lt;div&gt;Another Block&lt;/div&gt;`,
      css: `div { background: #4f8cff; color: #fff; padding: 0.5rem 1rem; }
div[style*=\"inline-block\"] { background: #10b981; }`,
    },
    explanation:
      "Block elements take full width and start on new lines, while inline elements only take necessary space and flow with text.",
  },
  {
    name: "flex",
    desc: "A shorthand for flex-grow, flex-shrink, and flex-basis. Used in flexbox layouts.",
    syntax: "flex: none | [ <flex-grow> <flex-shrink>? <flex-basis>? ]",
    browser: "All modern browsers",
    example: {
      preview: `<div style="display:flex;gap:1rem;">
  <div style="background:#a78bfa;flex:1;padding:1rem;text-align:center;">Item 1</div>
  <div style="background:#a78bfa;flex:2;padding:1rem;text-align:center;">Item 2</div>
  <div style="background:#a78bfa;flex:1;padding:1rem;text-align:center;">Item 3</div>
</div>`,
      html: `&lt;div style=\"display:flex\"&gt;
  &lt;div style=\"flex:1\"&gt;Item 1&lt;/div&gt;
  &lt;div style=\"flex:2\"&gt;Item 2&lt;/div&gt;
  &lt;div style=\"flex:1\"&gt;Item 3&lt;/div&gt;
&lt;/div&gt;`,
      css: `div { display: flex; }
div > div { flex: 1; }`,
    },
    explanation:
      "Flexbox creates a flexible container where items can grow, shrink, and align along the main axis.",
  },
  {
    name: "grid",
    desc: "A two-dimensional layout system for creating complex, responsive grid-based designs.",
    syntax: "display: grid",
    browser: "All modern browsers",
    example: {
      preview: `<div style="display:grid;grid-template-columns:1fr 2fr;gap:0.5rem;">
  <div style="background:#f59e42;padding:1rem;text-align:center;">Header</div>
  <div style="background:#f59e42;padding:1rem;text-align:center;">Sidebar</div>
  <div style="background:#f59e42;padding:1rem;text-align:center;grid-column:span 2;">Main Content</div>
  <div style="background:#f59e42;padding:1rem;text-align:center;grid-column:span 2;">Footer</div>
</div>`,
      html: `&lt;div style=\"display:grid;grid-template-columns:1fr 2fr\"&gt;
  &lt;div&gt;Header&lt;/div&gt;
  &lt;div&gt;Sidebar&lt;/div&gt;
  &lt;div style=\"grid-column:span 2\"&gt;Main Content&lt;/div&gt;
  &lt;div style=\"grid-column:span 2\"&gt;Footer&lt;/div&gt;
&lt;/div&gt;`,
      css: `div { display: grid; grid-template-columns: 1fr 2fr; }`,
    },
    explanation:
      "CSS Grid provides precise control over both rows and columns, perfect for complex layouts.",
  },
];

// Render property list
function renderPropertyList(filter = "") {
  const list = document.getElementById("propertyList");
  list.innerHTML = "";
  cssProperties
    .filter((prop) => prop.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((prop, idx) => {
      const li = document.createElement("li");
      li.textContent = prop.name;
      li.onclick = () => showProperty(idx);
      if (idx === 0 && !filter) li.classList.add("active");
      list.appendChild(li);
    });
}

// Render main content
function showProperty(idx) {
  const prop = cssProperties[idx];
  document.querySelectorAll(".property-list li").forEach((li, i) => {
    li.classList.toggle("active", i === idx);
  });
  document.getElementById("mainContent").innerHTML = `
        <h2>${prop.name}</h2>
        <div class="desc">${prop.desc}</div>
        <div class="syntax"><b>Syntax:</b> <code>${prop.syntax}</code> &nbsp; <b>Browser Support:</b> ${prop.browser}</div>
        <div class="section-title">Interactive Examples</div>
        <div class="example-box">
          <div class="example-preview">${prop.example.preview}</div>
          <div style="display:flex;gap:1rem;">
            <div style="flex:1;">
              <div style="font-weight:600;margin-bottom:0.3rem;">HTML</div>
              <pre>${prop.example.html}</pre>
            </div>
            <div style="flex:1;">
              <div style="font-weight:600;margin-bottom:0.3rem;">CSS</div>
              <pre>${prop.example.css}</pre>
            </div>
          </div>
        </div>
        <div class="section-title">Explanation</div>
        <div class="example-box">${prop.explanation}</div>
      `;
}

// Filter properties
function filterProperties() {
  const val = document.getElementById("searchBox").value;
  renderPropertyList(val);
  // Show first filtered property
  const filtered = cssProperties.filter((prop) =>
    prop.name.toLowerCase().includes(val.toLowerCase())
  );
  if (filtered.length) showProperty(cssProperties.indexOf(filtered[0]));
  else
    document.getElementById("mainContent").innerHTML =
      "<p>No property found.</p>";
}

// Initial render
renderPropertyList();
showProperty(0);
