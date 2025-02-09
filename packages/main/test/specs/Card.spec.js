const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Card general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Card.html`);
	});

	it("tests initial rendering", async () => {
		const card = await browser.$("#card");

		assert.ok(await card.isExisting(), "The component has shadow root.");
	});

	it("tests status not rendered, when action is set", async () => {
		const status = await browser.$("#actionCardHeader").shadow$(".ui5-card-header-status");

		assert.notOk(await status.isExisting(), "The status DOM is not rendered.");
	});

	it("tests header's click event with mouse click, Enter and Space", async () => {
		const cardHeader = await browser.$("#cardHeader").shadow$(".ui5-card-header");
		const cardHeader2 = await browser.$("#cardHeader2").shadow$(".ui5-card-header");
		// TODO: the field is bound to the "ui5-click" event, but it misses out a test case
		// change it to be bound to the "click" event, so we can test
		// if the browser's native 'click' event is not fired to prevent double firing of "click"
		// Currently this does not work right, because that "click" event
		// does not fire at all when running the test with WDIO/webdriver
		const field = await browser.$("#field");

		await cardHeader.click();
		await cardHeader.keys("Space");
		await cardHeader.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "The header's click event should be called 3 times.");

		await cardHeader2.click();
		await cardHeader2.keys("Space");
		await cardHeader2.keys("Enter");

		assert.strictEqual(await field.getProperty("value"), "3", "The events count should remain 3 as the header is not interactive.");
	});

	it("tests aria-labelledby", async () => {
		const card = await browser.$("#textAreaAriaLabel").shadow$(".ui5-card-root");
		const cardId = await browser.$("#textAreaAriaLabel").getProperty("_id");
		const EXPECTED_ARIA_LABELLEDBY_CARD = `${cardId}-desc`;

		assert.strictEqual(await card.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_CARD,
			"The aria-labelledby of card is correctly set.");
	})

	it("tests ARIA attributes of the content", async () => {
		const card = await browser.$("#card");
		const content = await card.shadow$(".ui5-card-root div:nth-child(2)");

		assert.strictEqual(await content.getAttribute("aria-label"), await card.getProperty("_ariaCardContentLabel"));
		assert.strictEqual(await content.getAttribute("role"), "group");
	});

	it("tests aria-level property", async () => {
		const cardHeader = await $("#card2").$("ui5-card-header");

		// Default value
		assert.strictEqual(await cardHeader.shadow$(".ui5-card-header").getAttribute("aria-level"), "3");

		await cardHeader.setAttribute("aria-level", 4);
		assert.strictEqual(await cardHeader.shadow$(".ui5-card-header").getAttribute("aria-level"), "4");
	});
});

describe("CardHeader", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/Card.html`);
	});

	it("tests header aria-labelledby", async () => {
		const header = await browser.$("#header").shadow$(".ui5-card-header");
		const header2 = await browser.$("#header2").shadow$(".ui5-card-header");
		const headerId = await browser.$("#header").getProperty("_id");
		const headerId2 = await browser.$("#header2").getProperty("_id");
		const EXPECTED_ARIA_LABELLEDBY_HEADER = `${headerId}-title ${headerId}-subtitle ${headerId}-status`;
		const EXPECTED_ARIA_LABELLEDBY_HEADER2 = `${headerId2}-title ${headerId2}-subtitle`;

		assert.strictEqual(await header.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER,
			"The aria-labelledby is correctly set.");
		assert.strictEqual(await header2.getAttribute("aria-labelledby"), EXPECTED_ARIA_LABELLEDBY_HEADER2,
			"The aria-labelledby is correctly set.");
	})

});
