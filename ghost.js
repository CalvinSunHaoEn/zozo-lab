/* Approved Mr. Ghost studio image; pricing and orders are handled by email. */
const ghostHeroImage = 'assets/products/mr-ghost/v11/hero-cutout.png';
const ghostInquiry='mailto:hello@zozo-lab.com?subject=Mr.%20Ghost%20%E2%80%94%20Product%20enquiry';
function ghostPhoto(alt='Mr. Ghost lamp',extra=''){return `<img class="crop art-ghost ${extra}" src="assets/products/mr-ghost/studio-approved-v1.png" alt="${alt}" width="1085" height="1449" loading="lazy">`;}
function ghostCard(p){return `<article class="product-card ghost-card"><a class="visual" href="#/product/mr-ghost" aria-label="View Mr. Ghost lamp">${ghostPhoto('Mr. Ghost — frosted white lamp with black sunglasses and yellow shoes')}</a><div class="card-topline"><span class="card-badge">Desk lamp</span><span class="card-price"><span class="price-pending">Contact for<br>pricing</span></span></div><p class="card-series">Lighting</p><div class="metadata"><h3><a href="#/product/mr-ghost">Mr. Ghost</a></h3><span>Explore ↗</span></div><button class="save-small" data-save="mr-ghost" aria-label="Save Mr. Ghost to your cart" aria-pressed="${saved.includes('mr-ghost')}">${saveText('mr-ghost')}</button></article>`;}
function ghostFeature(){return `<section class="ghost-feature"><a class="ghost-feature-image ghost-feature-scenes" href="#/product/mr-ghost" aria-label="Explore Mr. Ghost lamp"><img src="${ghostAssetBase}/daylight-off.png" alt="Mr. Ghost switched off in daylight" loading="lazy"><img src="${ghostAssetBase}/evening-on.png" alt="Mr. Ghost glowing at dusk" loading="lazy"></a><div class="ghost-feature-copy"><p class="eyebrow">Meet Mr. Ghost / Lighting</p><h2>A LITTLE<br>COMPANY.<br><span>A SOFTER LIGHT.</span></h2><p>Sunglasses on. Warm side out. A desk companion with a little attitude, made to brighten the everyday.</p><a class="pill-link dark" href="#/product/mr-ghost">Meet Mr. Ghost <span>↗</span></a></div></section>`;}
const ghostAssetBase = 'assets/products/mr-ghost/v11';
const ghostViews = ['Front', 'Side', 'Back'];

function ghostPage() {
  const thumbnails = ghostViews.map((view, index) => `<button type="button" data-ghost-view="${view}" aria-pressed="${index === 0}">
    <img src="${ghostAssetBase}/${view.toLowerCase()}.png" alt="">
    <span>${view}</span>
  </button>`).join('');

  return `<section class="detail store-detail ghost-detail">
    <div class="ghost-product-image detail-media" aria-label="Mr. Ghost image gallery">
        <img data-ghost-main src="${ghostAssetBase}/front.png" alt="Mr. Ghost front view" fetchpriority="high">
    </div>
    <div class="detail-info">
      <p class="eyebrow">ZOZO Lab / Lighting</p>
      <h1>Mr. Ghost</h1>
      <p class="ghost-lead">A little office attitude.<br>A softer side after hours.</p>
      <p class="price">Contact for pricing</p>
      <a class="primary-link" href="${ghostInquiry}">Enquire about Mr. Ghost <span aria-hidden="true">↗</span></a>
      <p class="release-note">Contact hello@zozo-lab.com for pricing, availability and ordering details.</p>
    </div>
    <div class="ghost-thumbnails detail-thumbnails" role="group" aria-label="Choose Mr. Ghost view">${thumbnails}</div>
    <div class="detail-notes">
      <button class="outline-button" data-save="mr-ghost" aria-pressed="${saved.includes('mr-ghost')}">${saved.includes('mr-ghost') ? 'Saved to your cart −' : 'Save to your cart +'}</button>
    </div>
  </section>
  <section class="ghost-story">
    <p class="eyebrow">From desk time to downtime</p>
    <h2>Good company.<br>Even after hours.</h2>
    <p>By day, a quiet character on your desk. By night, a warm presence beside your notebook.</p>
    <div class="ghost-scenes">
      <figure>
        <img src="${ghostAssetBase}/daylight-off.png" alt="Mr. Ghost switched off on a daylight desk, with its cable dropping over the left edge" loading="lazy">
        <figcaption>Off duty. Still in character.</figcaption>
      </figure>
      <figure>
        <img src="${ghostAssetBase}/evening-on.png" alt="Mr. Ghost emitting a warm glow at dusk, with its cable dropping over the left edge" loading="lazy">
        <figcaption>Let the evening soften.</figcaption>
      </figure>
    </div>
  </section>
  <section class="ghost-material">
    <img src="${ghostAssetBase}/material.png" alt="Close-up of the matte shade and black sunglasses" loading="lazy">
    <div>
      <p class="eyebrow">A closer look</p>
      <h2>Soft light.<br>Considered detail.</h2>
      <p>A finely textured, matte translucent shade softens the light. Black sunglasses, a little tie and rounded yellow shoes give Mr. Ghost its character.</p>
    </div>
  </section>
  <section class="ghost-specs">
    <div><p class="eyebrow">Product details</p><h2>Good to know.</h2></div>
    <dl>
      <div><dt>Color</dt><dd>Opal White / Black / Yellow</dd></div>
      <div><dt>Nominal dimensions (W × D × H)</dt><dd>104.6 × 87.8 × 197.8 mm</dd></div>
      <div><dt>Power connector</dt><dd>USB plug</dd></div>
      <div><dt>Switch</dt><dd>Inline switch</dd></div>
    </dl>
  </section>
  <section class="related">
    <div class="section-title"><h2>Continue exploring</h2><a class="text-link" href="#/shop">All objects</a></div>
    ${grid(products.filter(product => product.category === 'cases' && !comingSoonIds.has(product.id)))}
  </section>`;
}

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-ghost-view]');
  if (!button) return;

  const gallery = button.closest('.ghost-detail');
  const image = gallery.querySelector('[data-ghost-main]');
  const view = button.dataset.ghostView;
  image.src = `${ghostAssetBase}/${view.toLowerCase()}.png`;
  image.alt = `Mr. Ghost ${view.toLowerCase()} view`;
  gallery.querySelectorAll('[data-ghost-view]').forEach(option => {
    option.setAttribute('aria-pressed', String(option === button));
  });
});