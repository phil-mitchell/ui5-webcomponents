const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Form support", () => {

	it("Normal button does not submit forms", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/FormSupport.html`);

		const noSubmitButton = await browser.$("#b1");
		await noSubmitButton.click();

		const hrefIsSame = await browser.executeAsync(done => {
			done(location.href.endsWith("FormSupport.html"));
		});
		assert.ok(hrefIsSame, "By default the button does not submit a form");
	});

	it("Submit button does submit forms", async () => {
		await browser.url(`http://localhost:${PORT}/test-resources/pages/FormSupport.html`);

		const submitButton = await browser.$("#b2");
		await submitButton.click();

		const formWasSubmitted = await browser.executeAsync(done => {
			const expectedFormData = "?input=ok&ta=ok&dp=Apr+10%2C+2019&cb=on&radio=b&si=5";
			done(location.href.endsWith(expectedFormData));
		});
		assert.ok(formWasSubmitted, "For was submitted and URL changed");
	});

});
