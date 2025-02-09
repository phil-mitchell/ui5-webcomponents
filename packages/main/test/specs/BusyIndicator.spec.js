const assert = require("chai").assert;
const PORT = require("./_port.js");


describe("BusyIndicator general interaction", () => {
	before(async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/BusyIndicator.html`);
	});

	it("tests event propagation", async () => {
		const busyIndicator = await browser.$("#busy-tree");
		const dynamicItem = await (await busyIndicator.$("ui5-tree").shadow$("ui5-list").$$("ui5-li-tree")[2]).shadow$(".ui5-li-tree-toggle-box");
		const input = await browser.$("#tree-input");

		await dynamicItem.click();
		await dynamicItem.keys("Space");

		assert.strictEqual(await input.getProperty("value"), "0", "itemClick is not thrown");
	});

	it("test activation", async () => {
		const busyIndicator = await browser.$("#busy-container");
		const busyArea = await busyIndicator.shadow$(".ui5-busy-indicator-busy-area");

		assert.notOk(await busyArea.isExisting(), "busy area is not yet created");

		await busyIndicator.setAttribute("active", "");

		await busyArea.waitForExist({
			timeout: 3000,
			timeoutMsg: "Busy area must be created after 3000ms"
		});

		// reset
		await busyIndicator.removeAttribute("active");
		assert.notOk(await busyArea.isExisting(), "busy area is removed");
	});

	it("tests focus handling", async () => {
		const busyIndicator = await browser.$("#indicator1");
		await busyIndicator.click();

		let innerFocusElement = await browser.custom$("activeElement", "#indicator1");

		innerFocusElement = await browser.$(innerFocusElement);

		assert.strictEqual(await innerFocusElement.getAttribute("class"), "ui5-busy-indicator-busy-area", "The correct inner element is focused");
	});

	it("tests internal focused element attributes", async () => {
		const busyIndicator = await browser.$("#indicator1");
		await busyIndicator.click();
		const innerFocusElement = await busyIndicator.shadow$(".ui5-busy-indicator-busy-area");

		assert.strictEqual(await innerFocusElement.getAttribute("role"), "progressbar", "Correct 'role' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("tabindex"), "0", "Correct 'tabindex' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("aria-valuemin"), "0", "Correct 'aria-valuemin' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("aria-valuemax"), "100", "Correct 'aria-valuemax' is set");
		assert.strictEqual(await innerFocusElement.getAttribute("aria-valuetext"), "Busy", "Correct 'aria-valuetext' is set");
	});

	it("tests content is not reachable with keyboard when active in both directions", async () => {
		const beforeBusyIndicator = await browser.$("#beforeIndicatorWithBtn");
		const busyIndicator = await browser.$("#indicatorWithBtn");
		const afterBusyIndicator = await browser.$("#afterIndicatorWithBtn");

		await beforeBusyIndicator.click();
		await browser.keys("Tab");
		let activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await busyIndicator.getAttribute("id"), "Correct element is focused with TAB");

		await browser.keys("Tab");
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await afterBusyIndicator.getAttribute("id"), "Correct element is focused with TAB");

		await browser.keys(["Shift", "Tab"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await busyIndicator.getAttribute("id"), "Correct element is focused with SHIFT + TAB");

		await browser.keys(["Shift", "Tab"]);
		activeElement = await browser.getActiveElement();
		assert.strictEqual(await browser.$(activeElement).getAttribute("id"), await beforeBusyIndicator.getAttribute("id"), "Correct element is focused with SHIFT + TAB");
	});

	it("test inactive indicator in dialog - correct element from default slot is focused", async () => {
		await browser.$("#open-dialog-inactive-indicator").click();

		let activeElement = await browser.getActiveElement();
		assert.strictEqual(
			await browser.$(activeElement).getAttribute("id"),
			await browser.$("#dialog-inactive-indicator-focused-button").getAttribute("id"),
			"Correct element from default slot is focused"
		);
	});
});
