const PuppeteerExtraPlugin = require('puppeteer-extra-plugin');

class GhCustom extends PuppeteerExtraPlugin {
    constructor (opts = {}) {
        super(opts);
    }
    get name() {
        return 'ghcustom';
    }
    get defaults() {
        return {
            addJquery: true,
        }
    }
    async onPageCreated(page) {
        // this.debug('page created', page.url())
        // const ua = await page.browser().userAgent()
        // this.debug('user agent', ua)
    }
}

module.exports = function(opts) {
    return new PluGhCustomgin(opts)
}