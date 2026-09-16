/**
 * Generate link from name to be used in the URL
 *
 * Example:
 * generateLinkLink('Gia đình chị Hằng')
 * Output: string
 * Link gửi đi sẽ là: https://yourdomain.com/?g=string
 *
 * @param name - Name to be encoded
 * @returns string
 */

export const generateLinkLink = (name: string) => btoa(encodeURIComponent(name))
