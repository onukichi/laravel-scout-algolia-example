import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
    process.env.MIX_ALGOLIA_APP_ID,
    process.env.MIX_ALGOLIA_SEARCH
);

autocomplete({
    container: '#autocomplete',
    placeholder: '求人、職種を検索',
    getSources({ query }) {
        return [
            {
                sourceId: 'jobs',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: 'jobs',
                                query,
                                params: {
                                    hitsPerPage: 3,
                                },
                            },
                        ],
                    });
                },
                templates: {
                    header() {
                        return '求人';
                    },
                    item({ item, createElement, components }) {
                        return createElement('div', null,
                            createElement('a', { href: '/jobs/' + item.id},
                                components.Highlight({ hit: item, attribute: 'name', tagName: 'mark' })
                            )
                        );
                    },
                },
            },
            {
                sourceId: 'job_categories',
                getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                            {
                                indexName: 'job_categories',
                                query,
                                params: {
                                    hitsPerPage: 3,
                                },
                            },
                        ],
                    });
                },
                templates: {
                    header() {
                        return '職種';
                    },
                    item({ item, createElement, components }) {
                        return createElement('div', null,
                            createElement('a', { href: '/jobs?job_category_id=' + item.id },
                                components.Highlight({ hit: item, attribute: 'name', tagName: 'mark' })
                            )
                        );
                    },
                },
            },
        ];
    },
});