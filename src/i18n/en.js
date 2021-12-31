/* eslint-disable max-len */
/* eslint-disable quote-props */
const translations = {
  'app.title': 'Service map',
  'app.description': 'Find services near your home',
  'app.og.image.alt': 'Servicemap logo',
  'app.errorpage.title': 'Error message page',

  // Accessibility
  'accessibility': 'Accessibility',
  'accessibility.info': 'Accessibility details',
  'accessibility.details': 'Accessibility details',
  'accessibility.stamp': 'Accessibility acknowledged',
  'accessibility.shortcomings': 'Shortcomings',
  'accessibility.shortcomings.plural': `{count, plural,
                                =0 {no shortcomings}
                                one {# shortcoming}
                                other {# shortcomings}
                              }`,

  // Address
  'address': 'Address',
  'address.description': 'View services near the address',
  'address.search': 'Address search',
  'address.search.cleared': 'Search box cleared',
  'address.search.location': 'Chosen location is {location}',
  'address.search.suggestion': 'Choose an address from the search suggestions',
  'address.show.area': 'Show area on map',
  'address.error': 'No address found',
  'address.nearby': 'Nearby',
  'address.districts': 'Areas',
  'address.plural': 'Addresses',
  'address.services.header': 'Service areas',
  'address.services.info': 'Services for people who live here',
  'address.area.link': 'Get to know the areas on the map.',
  'address.emergency_care.common': 'When your health station is closed and in the night between 22-8, emergency care for children and young people under age 16 is provided at <a>New Children\'s Hospital</a> [<a1>homepage</a1>], and for adults at',
  'address.emergency_care.children_hospital.link': '/en/unit/62976',
  'address.emergency_care.common.link': 'https://www.hus.fi/en/patient/hospitals-and-other-units/new-childrens-hospital',
  'address.emergency_care.unit.26107': 'Malmi hospital',
  'address.emergency_care.unit.26104': 'Haartman hospital',
  'address.emergency_care.link': 'http://www.hel.fi/www/Helsinki/fi/sosiaali-ja-terveyspalvelut/terveyspalvelut/paivystys/',
  'address.emergency_care.link.text': '[<a>emergency webpages</a>]',

  // Area
  // TODO: clean unused translations
  'area.searchbar.infoText.address': 'Write your home address',
  'area.searchbar.infoText.optional': '(optional)',
  'area.tab.publicServices': 'Public service areas',
  'area.tab.geographical': 'Neighbourhoods and postal code areas',
  'area.services.local': 'Services in your own area',
  'area.services.nearby': 'Locations in nearby areas as a list',
  'area.services.nearby.rescue_district': 'Civil defence sections in nearby areas as a list',
  'area.services.nearby.rescue_sub_district': 'Civil defence subsections in nearby areas as a list',
  'area.services.all': 'Locations as a list',
  'area.services.all.rescue_area': 'Civil defence districts as a list',
  'area.services.all.rescue_district': 'Civil defence sections as a list',
  'area.services.all.rescue_sub_district': 'Civil defence subsections as a list',
  'area.info': 'Choose an area, whose services you want information about. Writing your home address in the search field opens a map, and the areas and districts that you belong to are shown under the Services in the area tab.',
  'area.choose.district': 'Choose area',
  'area.list': 'Area selection',
  'area.localAddress.title': 'Information according to your address',
  'area.localAddress.neighborhood': 'Neighbourhood: {area}',
  'area.localAddress.postCode': 'Postal code area: {area}',
  'area.geographicalServices.neighborhood': 'Services of the neighbourhood ({length})',
  'area.geographicalServices.postcode_area': 'Services of the postal code area ({length})',
  'area.geographicalServices.major_district': 'Services of the major district ({length})',
  'area.neighborhood.title': 'Choose neighbourhood',
  'area.postcode_area.title': 'Choose postal code',
  'area.major_district.title': 'Choose major district',
  'area.noSelection': 'Choose area from the Choice of Area tab',
  'area.noUnits': 'There are no service points in your chosen area',
  'area.popupLink': 'Show the details for the area (new tab)',
  'area.list.geographical': 'Geographical',
  'area.list.protection': 'Civil defence',
  'area.list.health': 'Health',
  'area.list.education': 'Education',
  'area.list.natureConservation': 'Nature conservation',
  'area.list.parking': 'Parking',
  'area.list.education.finnish': 'Finnish school areas',
  'area.list.education.swedish': 'Swedish school areas',
  'area.list.preschool': 'Pre-school education',
  'area.list.neighborhood': 'Neighborhood',
  'area.list.postcode': 'Postcode',
  'area.list.postcode_area': 'Postcode area',
  'area.list.major_district': 'Major district',
  'area.list.rescue_area': 'Civil defence district',
  'area.list.rescue_district': 'Civil defence section',
  'area.list.rescue_sub_district': 'Civil defence subsection',
  'area.list.health_station_district': 'Health station area',
  'area.list.maternity_clinic_district': 'Maternity clinic area',
  'area.list.lower_comprehensive_school_district_fi': 'Finnish primary school area',
  'area.list.lower_comprehensive_school_district_sv': 'Swedish primary school area',
  'area.list.upper_comprehensive_school_district_fi': 'Finnish secondary school area',
  'area.list.upper_comprehensive_school_district_sv': 'Swedish secondary school area',
  'area.list.preschool_education_fi': 'Finnish preschool education area',
  'area.list.preschool_education_sv': 'Swedish preschool education area',
  'area.list.nature_reserve': 'Nature conservation areas',
  'area.list.resident_parking_zone': 'Residential parking areas',
  'area.list.neighborhood.plural': 'Neighborhoods',
  'area.list.postcode_area.plural': 'Postcode areas',
  'area.list.major_district.plural': 'Major districts',
  'area.list.rescue_area.plural': 'Civil defence districts',
  'area.list.rescue_district.plural': 'Civil defence sections',
  'area.list.rescue_sub_district.plural': 'Civil defence subsections',
  'area.list.health_station_district.plural': 'Health station areas',
  'area.list.maternity_clinic_district.plural': 'Maternity clinic areas',
  'area.list.lower_comprehensive_school_district_fi.plural': 'Finnish primary school areas',
  'area.list.lower_comprehensive_school_district_sv.plural': 'Swedish primary school areas',
  'area.list.upper_comprehensive_school_district_fi.plural': 'Finnish secondary school areas',
  'area.list.upper_comprehensive_school_district_sv.plural': 'Swedish secondary school areas',
  'area.list.preschool_education_fi.plural': 'Finnish preschool education areas',
  'area.list.preschool_education_sv.plural': 'Swedish preschool education areas',
  'area.list.nature_reserve.plural': 'Nature conservation areass',
  'area.list.resident_parking_zone.plural': 'Residential parking areas',

  // Download dialog
  'download.cropping.title': 'Current filter values',
  'download.cropText.unit': 'Single service point:',
  'download.cropText.service': 'Service points with selected services:',
  'download.cropText.search': 'Service points based on text search:',
  'download.cropText.none': 'No filter values have been selected',
  'download.data.none': 'First select service points to be shown on the Service Map using the browse or search functions and then return to this view to save the information of the selected service points.',
  'download.download': 'Download the information (new tab)',
  'download.format': 'File format:',
  'download.info': 'Save the information of the service points that you have filtered into a file, which you can import, for example, to the Google Maps application or continue working with.',
  'download.title': 'Download the service location information',
  'download.coordinate': 'The coordinate system of the Service Map is: ETRS89 / GK25FIN (EPSG:3879)',

  // Event
  'event.description': 'Description',
  'event.time': 'Date and time',
  'event.picture': 'Event picture',
  'event.title': 'Events',

  // Embed
  'embed.click_prompt_move': 'Click to open the Service Map',

  // Embedder
  'embedder.city.title': 'City',
  'embedder.city.aria.label': 'Choose city limits for the embedding',
  'embedder.close': 'Close embedding tool',
  'embedder.code.title': 'Copy the HTML code',
  'embedder.height.title': 'Height of the embedding',
  'embedder.height.aria.label': 'Choose height of the embedding',
  'embedder.height.ratio.label': 'Relative height. The height of the embedding in relation to the width has been defined',
  'embedder.height.fixed.label': 'Absolute height. The height of the embedding has been defined in pixels',
  'embedder.height.input.aria.fixed': 'Height of the embedding in pixels',
  'embedder.height.input.aria.ratio': 'Height of the embedding as per cent of the width',
  'embedder.iframe.title': 'Service map embedding window',
  'embedder.language.title': 'Language of the embedding',
  'embedder.language.aria.label': 'Choose the language of the embedding',
  'embedder.language.description.fi': 'Service point information is shown in Finnish. Background map is in Finnish.',
  'embedder.language.description.sv': 'Service point information is shown in Swedish. Background map is in Swedish.',
  'embedder.language.description.en': 'Service point information is shown in English. Background map is in Finnish.',
  'embedder.map.title': 'Background map',
  'embedder.map.aria.label': 'Choose backgroud map',
  'embedder.preview.title': 'Map preview',
  'embedder.options.title': 'Show on the map',
  'embedder.options.label.units': 'Show service points',
  'embedder.options.label.transit': 'Show public transport stops (Zoom in the map to see the stops)',
  'embedder.service.title': 'Services',
  'embedder.service.aria.label': 'Choose services to be shown',
  'embedder.service.none': 'Map is shown without service points',
  'embedder.service.common': 'The city resident\'s most common everyday service points are shown on the map: schools, daycares and health stations.',
  'embedder.service.all': 'All service points are shown on the map. Too extensive area borders slow down the embedding and decreases its clarity.',
  'embedder.title': 'Embedding tool',
  'embedder.title.info': 'If you want to make an embedding from a search result, start by making the search.',
  'embedder.url.title': 'Copy the address',
  'embedder.width.title': 'Width of the embedding',
  'embedder.width.aria.label': 'Choose width of the embedding',
  'embedder.width.auto.label': 'Automatic width. The embedding fills the width of the element in which it has been placed. In this preview, the embedding has been placed in a standard-width element, which has been outlined with a broken line. ',
  'embedder.width.custom.label': 'Width has been set. The width of the embedding has been set in pixels.',
  'embedder.width.input.aria.auto': 'Width of the embedding, per cent',
  'embedder.width.input.aria.custom': 'Width of the embedding, pixels',

  // Feedback
  'feedback.back': 'Go back',
  'feedback.title': 'Give feedback on this web service',
  'feedback.title.unit': 'Give feedback on the service point {unit}',
  'feedback.email': 'Email',
  'feedback.email.info': 'If you want us to answer the feedback, please provide your e-mail address.',
  'feedback.feedback': 'Your feedback (required)',
  'feedback.feedback.info': 'Tell as precisely as possible, what kind of feedback you want to give.',
  'feedback.permission': 'My feedback may be published (after checking). The e-mail address will not be published.',
  'feedback.additionalInfo': 'Your feedback is forwarded to the city of Helsinki\'s feedback system.',
  'feedback.additionalInfo.link': 'Information and instructions on giving feedback (link opens in new tab).',
  'feedback.send': 'Send feedback',
  'feedback.sending': 'Sending...',
  'feedback.send.error': 'Send feedback. Mandatory field is empty',
  'feedback.error.required': 'Mandatory field',
  'feedback.srError.required': 'Feedback is required',
  'feedback.modal.confirm': 'OK',
  'feedback.modal.leave': 'Are you sure you want to leave the page?',
  'feedback.modal.success': 'Thank you for your feedback!',
  'feedback.modal.error': 'Failed to send. Try again later',

  // Sorting
  'sorting.label': 'Sort search results',
  'sorting.accessibility.desc': 'Most accessibile first',
  'sorting.alphabetical.asc': 'Reversed alphabetical order',
  'sorting.alphabetical.desc': 'Alphabetical order',
  'sorting.distance.asc': 'Closest first',
  'sorting.match.desc': 'Most relevant first',

  // General
  'general.frontPage': 'Front page',
  'general.contrast': 'Contrast',
  'general.contrast.ariaLabel.on': 'Turn on the high contrast mode',
  'general.contrast.ariaLabel.off': 'Go back to the standard contrast mode',
  'general.menu': 'Menu',
  'general.back': 'Back',
  'general.back.area': 'Back to area page',
  'general.back.address': 'Back to address page',
  'general.back.home': 'Back to home page',
  'general.back.goToHome': 'Go to home page',
  'general.back.search': 'Back to search page',
  'general.back.service': 'Back to service page',
  'general.back.unit': 'Back to service point page',
  'general.back.event': 'Back to event page',
  'general.back.info': 'Return back',
  'general.back.feedback': 'Return back',
  'general.backTo': 'Return back', // TODO: verify
  'general.backToHome': 'Close search and return to beginning',
  'general.backToStart': 'Back to beginning of page',
  'general.back.serviceTree': 'Back to service list page',
  'general.cancel': 'Cancel',
  'general.close': 'Close',
  'general.distance.meters': 'Meters away',
  'general.distance.kilometers': 'Kilometers away',
  'general.yes': 'Yes',
  'general.no': 'No',
  'general.closeSettings': 'Close settings',
  'general.fetching': 'Loading data...',
  'general.home': 'Home',
  'general.noData': 'No data available',
  'general.news.alert.title': 'Notification window',
  'general.news.alert.close.aria': 'Close notification window',
  'general.news.info.title': 'Service map news',
  'general.language.fi': 'Suomeksi',
  'general.language.sv': 'På svenska',
  'general.language.en': 'In English',
  'general.loading': 'Loading',
  'general.loading.done': 'Loading completed',
  'general.showOnMap': 'Show on map',
  'general.open': 'Open', // TODO: Verify
  'general.page.close': 'Close page', // TODO: Verify
  'general.pageTitles.home': 'Home page',
  'general.pageTitles.search': 'Search results page',
  'general.pageTitles.unit': 'Service point page',
  'general.pageTitles.unit.services': 'Service points\' services',
  'general.pageTitles.unit.events': 'Service points\' events',
  'general.pageTitles.unit.reservations': 'Service points\' reservable objects',
  'general.pageTitles.service': 'Service page',
  'general.pageTitles.serviceTree': 'Services list page',
  'general.pageTitles.serviceTree.title': 'Services list',
  'general.pageTitles.event': 'Event page',
  'general.pageTitles.address': 'Address page',
  'general.pageTitles.list.events': 'Event list ',
  'general.pageTitles.list.reservations': 'Reservation list ',
  'general.pageTitles.info': 'Info page',
  'general.pageTitles.feedback': 'Feedback page',
  'general.pageTitles.area': 'Area page',
  'general.tools': 'Tools',
  'general.pageTitles.mobilityPlatform': 'Mobility platform',
  'general.pageTitles.mobilityPlatform.title': 'Mobility platform',
  // Readspeaker
  'general.readspeaker.buttonText': 'Listen',
  'general.readspeaker.title': 'Listen with ReadSpeaker webReader',

  // General - Pagination
  'general.pagination.previous': 'Previous page',
  'general.pagination.next': 'Next page',
  'general.pagination.openPage': 'Open page {count}',
  'general.pagination.currentlyOpenedPage': 'Page {count} currently opened',
  'general.pagination.pageCount': 'page {current} of {max}',

  'general.previousSearch': 'Previous searches',
  'general.return.viewTitle': 'Return to beginning of main content',
  'general.skipToContent': 'Skip to content',
  'general.new.tab': 'Opens in new tab',
  'general.save': 'Save',
  'general.save.changes': 'Save settings',
  'general.save.changes.done': 'Changes have been saved!',
  'general.save.confirmation': 'Would you like to save changes?',
  'general.search': 'Search',
  'general.time.short': 'at',

  // Home
  'home.buttons.settings': 'Save your own city and accessibility options',
  'home.buttons.services': 'Get to know the services using the Services list',
  'home.buttons.closeByServices': 'Show nearby services',
  'home.buttons.instructions': 'Tips for using the service map',
  'home.buttons.area': 'View the areas for healthcare, education, pre-primary education, civil defence, nature and neighborhoods.',
  'home.example.search': 'Search for',
  'home.message': 'Message from the developers',
  'home.send.feedback': 'Give feedback',
  'home.old.link': 'Old version of Servicemap',
  'home.buttons.mobilityPlatformSettings': 'Mobility Platform',

  // Location
  'location.notFound': 'Location not found',
  'location.notAllowed': 'Location not allowed',
  'location.center': 'Center on user\'s location',

  // Loading texts
  'loading.events': 'Loading events {count} / {max}',
  'loading.events.srInfo': 'Loading {count} event(s)',
  'search.loading.units': 'Searching service points {count} / {max}',
  'search.loading.units.srInfo': 'Searching {count} service point(s)',
  'search.loading.units.simple': 'Searching service points',

  // Map
  'map': 'Map',
  'map.ariaLabel': 'Map. Currently map information is only accessible visually.',
  'map.attribution.osm': '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>',
  'map.attribution.helsinki': '&copy; Cities of Helsinki, Espoo, Vantaa ja Kauniainen',
  'map.transit.endStation': 'Terminus',
  'map.address.coordinate': 'Share location coordinate',
  'map.address.searching': 'Retreiving address...',
  'map.address.notFound': 'The address could not be found',
  'map.address.info': 'Address information',
  'map.unit.cluster.popup.info': '{count} service points',
  'map.button.sidebar.hide': 'Hide sidebar',
  'map.button.sidebar.show': 'Show sidebar',

  // Print
  'print.alert': 'Use the toolbox printing option',
  'print.button.close': 'Close the view',
  'print.button.print': 'Print the view',
  'print.table.header.number': 'Number on the map',

  // Units
  'unit': 'Service point',
  'unit.showInformation': 'Show the details for the service point',
  'unit.accessibility.hearingMaps': 'Coverage maps',
  'unit.accessibility.noInfo': 'No accessibility information',
  'unit.accessibility.noShortcomings': 'No known shortcomings',
  'unit.accessibility.ok': 'Accessible',
  'unit.accessibility.problems': `{count, plural,
                                    =0 {Accessible}
                                    one {# accessibility shortcoming}
                                    other {# accessibility shortcomings}
                                  }`,
  'unit.accessibility.unitNoInfo': 'Accessibility information missing.',
  'unit.basicInfo': 'Information',
  'unit.data_source': 'Source: {data_source}',
  'unit.details.notFound': 'Service point info not available.',
  'unit.plural': 'Service points',
  'unit.distance': 'Distance',

  'unit.contact.info': 'Contact information',
  'unit.links': 'Web sites',
  'unit.eServices': 'Electronic services',
  'unit.reservations': 'Reservable objects',
  'unit.events': 'Events',
  'unit.events.description': 'Here you can find information about events provided by the unit',
  'unit.events.count': `{count, plural,
    =0 {}
    one {# event}
    other {# events}
  }`,
  'unit.events.more': 'Show more events ({count})',
  'unit.homepage': 'Home page',
  'unit.homepage.missing': 'No home page provided',
  'unit.picture': 'Picture of service point: ',
  'unit.description': 'Service point description',
  'unit.address': 'Address',
  'unit.address.missing': 'No address provided',
  'unit.entrances.main': 'Main entrance',
  'unit.entrances.secondary': 'Additional entrance',
  'unit.entrances.show': 'View additional entrances',
  'unit.entrances.accessibility': 'View accessibility details',
  'unit.phone': 'Phone number',
  'unit.phone.missing': 'No phone number provided',
  'unit.phone.charge': 'Call charges',
  'unit.email': 'Email',
  'unit.email.missing': 'No email provided',
  'unit.opening.hours': 'Opening hours',
  'unit.opening.hours.missing': 'No opening hours provided',
  'unit.opening.hours.info': 'Additional information about opening hours', // TODO verify
  'unit.contact': 'Contact person',
  'unit.school.year': 'School year',
  'unit.opens.new.tab': '(new tab)',
  'unit.reservations.description': 'Here you can find information about the unit’s spaces and equipment that may be reserved.',
  'unit.reservations.count': `{count, plural,
    =0 {}
    one {# reservable object}
    other {# reservable objects}
  }`,
  'unit.reservations.more': 'Show more reservable objects ({count})',
  'unit.call.number': '(call)',
  'unit.list.services': 'Services',
  'unit.list.events': 'Events',
  'unit.list.reservations': 'Reservable objects',
  'unit.services': 'Services related to the unit',
  'unit.services.description': 'Along with the service description, you can find information about different service channels provided by the municipality.',
  'unit.services.more': 'Show more services ({count})',
  'unit.services.count': `{count, plural,
    =0 {}
    one {# service}
    other {# services}
  }`,
  'unit.educationServices': 'The unit’s services per school year',
  'unit.educationServices.description': 'School year {semester}',
  'unit.educationServices.more': 'Show more services ({count})',
  'unit.route': 'Look at the route to this place',
  'unit.route.extra': '(New tab. The HSL Journey Planner is not an accessible service)',
  'unit.socialMedia.title': 'The service point on social media',
  'unit.outdoorLink': 'Check the condition of an exercise location in the ulkoliikunta.fi service',
  'unit.seo.description': 'View service point on the map',
  'unit.seo.description.accessibility': 'View accessibility info and service point on the map',
  // Search
  'search': 'Search',
  'search.arrowLabel': 'Refine',
  'search.cancelText': 'Clear search text',
  'search.notFoundWith': 'No results for search "{query}".',
  'search.placeholder': 'Search for services or locations',
  'search.info': `{count, plural,
                  =0 {No locations were found}
                  one {# location found}
                  other {# locations found}
                }`,
  'search.resultList': `{count, plural,
                  =0 {no matches}
                  one {# match}
                  other {# matches}
                }`,
  'search.results': `{count, plural,
                  =0 {No results found with given search}
                  one {# result found}
                  other {# results found}
                }`,
  'search.results.short': `{count, plural,
                  =0 {No matches}
                  one {# match}
                  other {# matches}
                }`,
  'search.results.units': `{count, plural,
                  =0 {no service points found}
                  one {# service point found}
                  other {# service points found}
                }`,
  'search.results.services': `{count, plural,
                  =0 {no services found}
                  one {# service found}
                  other {# services found}
                }`,
  'search.resultInfo': 'Search information',
  'search.searchField': 'Search field',
  'search.results.title': 'Search results',
  'search.input.placeholder': 'Search locations',
  'search.notFound': 'No results found with given search',
  'search.started': 'Search started',
  'search.infoText': '{count} Search results',
  'search.searchbar.headerText': 'Find services near your home',
  'search.searchbar.infoText': 'Search for services, locations or addresses',
  'search.skipLink': 'Move straight to the search results',
  'search.suggestions.suggest': 'Did you mean..?',
  'search.suggestions.expand': 'Search suggestions',
  'search.suggestions.loading': 'Loading suggestions',
  'search.suggestions.error': 'No suggestions',
  'search.suggestions.suggestions': '{count} search suggestions',
  // 'search.suggestions.expandSuggestions': '{count} refinement suggestions',
  'search.suggestions.results': '{count} results',
  'search.suggestions.hideButton': 'Hide the list of suggestions',
  'search.suggestions.history': '{count} items in search history',
  'search.suggestions.noHistory': 'No previous searches',
  'search.tryAgain': 'Try searching again',
  'search.tryAgainBody.spelling': 'check spelling',
  'search.tryAgainBody.city': 'check city choices',
  'search.tryAgainBody.service': 'write name of service',
  'search.tryAgainBody.address': 'write address close to service you are looking for',
  'search.tryAgainBody.keyword': 'write keywords, e.g. nature trail, Swedish day-care centre',
  'search.expand': 'Refine search',
  'search.closeExpand': 'Return to search',

  // Service
  'service': 'Service',
  'service.plural': 'Services',
  'service.nearby': 'Nearby services',
  'service.units.empty': 'Service does not have service points',
  'service.tab': 'Services and events',
  'service.description': 'View locations and contact information of services',

  // Service tree
  'services': 'Services list',
  'services.selections': `{count, plural,
      one {You have made (#) selection}
      other {You have made (#) selections}
    }`,
  'services.selections.delete': 'Remove selection',
  'services.selections.delete.all': 'Remove all selections',
  'services.selections.delete.sr': 'Remove selection {service}',
  'services.search': 'Perform search',
  'services.search.sr': 'Perform search with the selected services',
  'services.search.sr.selected': 'Perform search with services: {services}',
  'services.category.select': 'All',
  'services.category.open': 'Open category',
  'services.tree.level': 'Level',
  'services.description.extra.cgsTitle': 'Charging stations',
  'services.description.extra.gfsTitle': 'Gas filling station',
  'services.description.extra.bisTitle': 'Bicycle stand',

  // Settings
  'settings': 'Settings',
  'settings.change': 'Edit your settings',
  'settings.drawer.aria.title': 'Current settings',
  'settings.citySettings': 'City',
  'settings.citySettings.long': 'City settings',
  'settings.mapSettings': 'Background map',
  'settings.mapSettings.long': 'Map setttings',
  'settings.accessibilitySettings': 'Accessibility settings',
  'settings.accessibilitySettings.long': 'Accessibility settings',
  'settings.mobile.long': 'Settings',
  'settings.search.long': 'Settings',
  'settings.area.long': 'City settings',
  'settings.amount': `{count, plural,
    one {# selection}
    other {# selections}
  }`,
  'settings.accessibility': 'My accessibility settings',
  'settings.accessibility.none': 'No filters',
  'settings.sense.title': 'Hearing and sight',
  'settings.sense.hearingAid': 'I use a hearing aid',
  'settings.sense.visuallyImpaired': 'I am visually impaired',
  'settings.sense.colorblind': 'I have color vision deficiency',
  'settings.info.heading': 'Settings info',
  'settings.info.title': 'Your selected settings will effect search results',
  'settings.info.title.city': 'The city settings affect the area information',
  'settings.info.title.noSettings': 'Change search or accessibility settings',
  'settings.info.title.noSettings.city': 'Change the city settings to narrow down the number of areas',
  'settings.mobility.title': 'Mobility impairments',
  'settings.mobility.none': 'No mobility impairments',
  'settings.mobility.wheelchair': 'I use a wheelchair',
  'settings.mobility.reduced_mobility': 'I have reduced mobility',
  'settings.mobility.rollator': 'I use a rollator',
  'settings.mobility.stroller': 'I push a stroller',
  'settings.city.info': `{count, plural,
    one {Chosen city}
    other {Chosen cities}
  }`,
  'settings.city.all': 'Show all',
  'settings.city.title': 'City',
  'settings.city.helsinki': 'Helsinki',
  'settings.city.espoo': 'Espoo',
  'settings.city.vantaa': 'Vantaa',
  'settings.city.kauniainen': 'Kauniainen',
  'settings.city.kirkkonummi': 'Kirkkonummi',
  'settings.map.title': 'Background map',
  'settings.map.servicemap': 'Service map',
  'settings.map.ortographic': 'Aerial view',
  'settings.map.guideMap': 'Guide map',
  'settings.map.accessible_map': 'High contrast map',
  'settings.aria.changed': 'Settings have changed. Remember to save',
  'settings.aria.closed': 'Settings closed',
  'settings.aria.open': 'Open settings',
  'settings.aria.opened': 'Settings have been opened',
  'settings.aria.saved': 'Settings have been saved',

  // Tools
  'tool.download': 'Download data',
  'tool.measuring': 'Measure distance (mouse only)',
  'tool.measuring.stop': 'Stop measuring',
  'tool.print': 'Print',

  'info.title': 'About the service and accessibility statement',
  'info.statement': 'Accessibility statement',

  'alert.close': 'Close the notification',

  // Mobility Platform of Turku
  // Menu
  'mobilityPlatform.menu.title': 'Mobility',
  'mobilityPlatform.menu.subtitle': 'Settings',
  'mobilityPlatform.menu.title.walk': 'Walking',
  'mobilityPlatform.menu.title.bicycle': 'Bicycle',
  'mobilityPlatform.menu.title.car': 'Car',
  'mobilityPlatform.menu.showChargingStations': 'Charging stations',
  'mobilityPlatform.menu.showGasStations': 'Gas filling stations',
  'mobilityPlatform.menu.showEcoCounter': 'Eco Counter',
  'mobilityPlatform.menu.showMaintenanceLocations': 'Street maintenance',
  'mobilityPlatform.menu.showBicycleMain': 'Main bicycle network',
  'mobilityPlatform.menu.showRentalCars': 'Rental cars',
  'mobilityPlatform.menu.showBicycleStands': 'Bicycle stands',
  'mobilityPlatform.menu.showMainBicycleRoutes': 'Main bicycle routes',
  'mobilityPlatform.menu.showLocalBicycleRoutes': 'Local bicycle routes',
  'mobilityPlatform.menu.showQualityBicycleRoutes': 'Quality lanes',
  'mobilityPlatform.menu.showSnowPlows': 'Street maintenance',

  // Content
  'mobilityPlatform.content.cgsTitle': 'Charging station',
  'mobilityPlatform.content.address': 'Address',
  'mobilityPlatform.content.cgsType': 'Charging station type',
  'mobilityPlatform.content.url': 'More information',
  'mobilityPlatform.content.gfsTitle': 'Gas filling station',
  'mobilityPlatform.content.gfsType': 'Gas filling station type',
  'mobilityPlatform.content.chargersTitle': 'Charging stations',
  'mobilityPlatform.content.operator': 'Operator',
  'mobilityPlatform.content.count': 'Amount',
  'mobilityPlatform.content.power': 'Power',
  'mobilityPlatform.content.bicycleStands.model': 'Model',
  'mobilityPlatform.content.bicycleStands.covered': 'Bicycle stand is covered',
  'mobilityPlatform.content.bicycleStands.notCovered': 'Bicycle stand is not covered',
  'mobilityPlatform.content.bicycleStands.hullLockable': 'Bicycle hull can be locked',
  'mobilityPlatform.content.bicycleStands.hullNotLockable': 'Bicycle hull can not be locked',
  'mobilityPlatform.content.bicycleStands.numOfPlaces': 'Number of places',
  'mobilityPlatform.content.bicycleStands.numOfStands': 'Number of stands',
  'mobilityPlatform.content.bicycleStands.maintainedByTku': 'Maintained by City of Turku.',
  'mobilityPlatform.content.rentalCars.title': 'Rental car',
  'mobilityPlatform.content.rentalCars.address': 'Address',
  'mobilityPlatform.content.rentalCars.manufacturer': 'Car manufacturer',
  'mobilityPlatform.content.rentalCars.carModel': 'Car model',
  'mobilityPlatform.content.rentalCars.available': 'Car is available',
  'mobilityPlatform.content.rentalCars.notAvailable': 'Car is reserved',
  'mobilityPlatform.content.streetMaintenance': 'Active maintenance',
  'mobilityPlatform.content.streetMaintenance.title': 'Maintenance work',
  'mobilityPlatform.content.streetMaintenance.snowPlow': 'Snowplowing',
  'mobilityPlatform.content.streetMaintenance.sandSpread': 'Sand spreading',
  'mobilityPlatform.content.streetMaintenance.deIcing': 'De-icing',
  'mobilityPlatform.content.streetMaintenance.time': 'Time',

  // Info text
  'mobilityPlatform.info.ecoCounter': 'Laskentapisteet keräävät tietoa liikenteestä mittaamalla eri liikennemuotojen käyttäjien määriä valituissa kohteissa.',
  'mobilityPlatform.info.bicycleStands': 'Turun kaupungin ylläpitämät polkupyöräparkit käsittävät kolmentyyppisiä pyöräpysäkkejä: katetut ja runkolukittavat pyöräparkit, runkolukittavat pyöräparkit ja rengastelineelliset, ei runkolukittavat pyöräparkit.',
  'mobilityPlatform.info.chargingStations': 'Turun alueen julkiset autojen sähkölatauspisteet.',
  'mobilityPlatform.info.gasFillingStations': 'Turun alueen julkiset kaasutankkausasemat.',
  'mobilityPlatform.info.bicycleMain': 'Pääpyöräreitit yhdistävät seutukeskukset toisiinsa sekä pienemmät paikalliskeskukset seutukeskuksiin. Pääverkostoa käytetään ensisijaisesti pidempiin pyörämatkoihin.',
  'mobilityPlatform.info.bicycleLocal': 'Paikallispyöräreitit yhdistävät paikalliskeskukset toisiinsa ja liittävät ne pääpyöräreitteihin. Alueiden sisäiset reitit ovat osa paikallispyöräreitistöä.',


  // Ecocounter
  'ecocounter.hour': 'Hourly',
  'ecocounter.day': 'Daily',
  'ecocounter.week': 'Weekly',
  'ecocounter.month': 'Monthly',
  'ecocounter.walk': 'Walk',
  'ecocounter.bicycle': 'Bicycle',
  'ecocounter.car': 'Car',
  'ecocounter.chart.labelTo': 'To city',
  'ecocounter.chart.labelFrom': 'From city',
  'ecocounter.chart.labelTotal': 'Total',
};

let overridingExternalTranslations;

// Read and merge external translations with current translations
try {
  // eslint-disable-next-line global-require,import/no-unresolved
  overridingExternalTranslations = require('./externalTranslations/en.json');
} catch (e) {
  overridingExternalTranslations = {};
}

const englishTranslations = { ...translations, ...overridingExternalTranslations };
export default englishTranslations;
