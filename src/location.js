function getLocation(href) {
    // If href starts with relative path
    if (href.slice(0, 1) === '/' ||
        (href.slice(0, 5) !== 'http:' && href.slice(0, 6) !== 'https:')) {
        current = getLocation(location.href);
        href = current.protocol + '//' + current.host + href;
    }
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/?[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && {
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
    };
}
