import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-sort-item",
	properties: /** @lends sap.ui.webcomponents.fiori.SortItem.prototype */ {
		/**
		 * Defines the text of the component.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 */
		text: {
			type: String,
		},

		/**
		 * Defines if the component is selected.
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.SortItem.prototype */ {
		//
	},
	events: /** @lends sap.ui.webcomponents.fiori.SortItem.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-sort-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/SortItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.SortItem
 * @extends UI5Element
 * @since 1.0.0-rc.16
 * @tagname ui5-sort-item
 * @public
 */
class SortItem extends UI5Element {
	static get metadata() {
		return metadata;
	}
}

SortItem.define();

export default SortItem;
