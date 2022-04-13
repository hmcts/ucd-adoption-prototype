const { uniqueSiblingFirstNames } = require("../../data/session-data-defaults");

module.exports = (router) => {

// ******************************************** ELIGIBILITY ********************************************
// ************************************************************************************************************************************

// ********************** Eligibility **********************
  router.post('/r2/eligibility/under-18', function(req, res) {
    var errors = []
    if (req.body['child-under-18'] === undefined) {
      errors.push({
      text: "Please answer the question",
      href: '#under-18'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-under-18'] === "Yes") {
        res.redirect('/r2/eligibility/married')
      }
      else {
        res.redirect('/r2/eligibility/cannot-apply-over-18')
      }
    }
    else {
        res.render('.//r2/eligibility/under-18', { errors: errors })
    }

  })


  router.post('/r2/eligibility/married', function(req, res) {
    var errors = []
    if (req.body['child-married'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#married'
      })
    }

    if (errors.length === 0) {
      if (req.body['child-married'] === 'Yes') {
        res.redirect('/r2/eligibility/cannot-apply-married')
      }
      else {
        res.redirect('/r2/eligibility/under-21')
      }
    }
    else {
        res.render('.//r2/eligibility/married', { errors: errors })
    }

  })


  router.post('/r2/eligibility/under-21', function(req, res) {
    var errors = []
    if (req.body['under-21'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#under-21'
      })
    }

    if (errors.length === 0) {
      if (req.body['under-21'] === "Yes") {
        res.redirect('/r2/eligibility/domicile')
      }
      else {
        res.redirect('/r2/eligibility/cannot-apply-under-21')
      }
    }
    else {
        res.render('.//r2/eligibility/under-21', { errors: errors })
    }
  })


  router.post('/r2/eligibility/domicile', function(req, res) {
    var errors = []
    if (req.body['domicile'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#domicile'
      })
    }

    if (errors.length === 0) {
      if (req.body['domicile'] === "Yes") {
        res.redirect('/r2/eligibility/lived-uk')
      }
      else {
        res.redirect('/r2/eligibility/cannot-apply-domicile')
      }
    }
    else {
        res.render('.//r2/eligibility/domicile', { errors: errors })
    }
  })


  router.post('/r2/eligibility/lived-uk', function(req, res) {
    var errors = []
    if (req.body['lived-uk'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#lived-uk'
      })
    }

    if (errors.length === 0) {
      if (req.body['lived-uk'] === "Yes") {
        res.redirect('/r2/registration/start1')
      }
      else {
        res.redirect('/r2/eligibility/cannot-apply-lived-uk')
      }
    }
    else {
        res.render('.//r2/eligibility/lived-uk', { errors: errors })
    }
  })


  router.post('/r2/eligibility/do-you-need-help-with-fees', function(req, res) {
    var errors = []
    if (req.body['need-help-with-fees'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#need-help-with-fees'
      })
    }

    if (errors.length === 0) {
      if (req.body['need-help-with-fees'] === "Yes") {
        res.redirect('/r2/eligibility/apply-for-help-with-fees')
      }
      else {
        res.redirect('/r2/registration/start1')
      }
    }
    else {
        res.render('.//r2/eligibility/do-you-need-help-with-fees', { errors: errors })
    }
  })






// ******************************************** SECTION 1. APPLICATION ********************************************
// ************************************************************************************************************************************

  // ********************** Number of applicants **********************
  router.post('/r2/application/number-of-applicants', function(req, res) {
    var errors = []
    if (req.body['number-of-applicants'] === undefined) {
      errors.push({
      text: 'Select an option which best describes who is applying',
      href: '#number-of-applicants'
      })
    }
    else if (req.body['number-of-applicants'] === "other" && req.body['other-relationship-description'].length == 0 ) {
      errors.push({
        text: 'Provide details of your relationship with the other applicant',
        href: '#other-explanation'
        })

    }

    req.session.data.numberApplicants = req.body['number-of-applicants']

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/application/number-of-applicants', { errors: errors })
      }
    }
    else {
        res.redirect('/r2/task-list')
    }
    console.log("Applicants: ", req.session.data.numberApplicants)
  })


  // ********************** Number of children **********************
  router.post('/r2/application/number-of-children', function(req, res) {
    var errors = []
    if (req.body['number-of-children'] === undefined) {
      errors.push({
      text: 'Select number of children you are applying to adopt',
      href: '#number-of-children'
      })
    }
    else if (req.body['number-of-children'] === "3" && req.body['exact-number-children'].length == 0 ) {
      errors.push({
        text: 'Provide the exact number of children you are applying to adopt',
        href: '#other-explanation'
        })

    }

    req.session.data.numberApplicants = req.body['number-of-children']

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/application/number-of-children', { errors: errors })
      }
    }
    else {
        res.redirect('/r2/task-list')
    }
    console.log("Applicants: ", req.session.data.numberApplicants)
  })


  // ********************** Date child moved in **********************
  router.post('/r2/application/date-child-moved-in', function(req, res) {
    var errors = []
    if (req.body['day-moved-in'] === '' || req.body['month-moved-in'] === '' || req.body['year-moved-in'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-90 for different error messages',
      href: '#date-child-moved-in'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          req.session.data.dateMovedIn = 1
          res.redirect('/r2/task-list')
        }
        else {
          res.render('.//r2/application/date-child-moved-in', { errors: errors })
        }
      }
      else {
        res.redirect('/r2/task-list')
      }
  })


  // ********************** Adoption agency or local authority **********************
  router.post('/r2/application/local-authority-details', function(req, res) {
    var errors = []
    if (req.body['applicant-agency-name'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#name'
      })
    }
    if (req.body['applicant-phone-number'] === '') {
      errors.push({
      text: 'Enter a UK telephone number',
      href: '#phone'
      })
    }
    if (req.body['applicant-contact'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#contact'
      })
    }


    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.agencyStatus = 'in progress'
        res.redirect('/r2/application/applicant-other-adoption-agency')
      }
      else {
        res.render('.//r2/application/local-authority-details', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/application/applicant-other-adoption-agency', function(req, res) {
    // console.log("Mother alive: ", req.body['other-adoption-agency'])
    var errors = []
    if (req.body['other-adoption-agency'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#other-adoption-agency'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['other-adoption-agency'] === 'yes') {
          res.redirect('/r2/application/applicant-adoption-agency-details-2')
        }
        else {
          res.redirect('/r2/application/child-social-worker-details')
        }
      }
      else {
        res.render('.//r2/application/applicant-other-adoption-agency', { errors: errors })
      }
    }
    else {
        res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/application/applicant-adoption-agency-details-2', function(req, res) {
    var errors = []
    if (req.body['applicant-agency-name-2'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#name'
      })
    }
    if (req.body['applicant-phone-number-2'] === '') {
      errors.push({
      text: 'Enter a UK telephone number',
      href: '#phone'
      })
    }
    if (req.body['applicant-contact-2'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#contact'
      })
    }
    

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/r2/application/child-social-worker-details')
      }
      else {
        res.render('.//r2/application/applicant-adoption-agency-details-2', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/application/child-social-worker-details', function(req, res) {
    var errors = []
    if (req.body['child-social-worker-name'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#name'
      })
    }
    if (req.body['child-social-worker-la-name'] === '') {
      errors.push({
      text: 'Enter a name',
      href: '#laname'
      })
    }
    if (req.body['child-social-worker-phone-number'] === '') {
      errors.push({
      text: 'Enter a UK telephone number',
      href: '#phone'
      })
    }
    if (req.body['child-social-worker-email'] === '') {
      errors.push({
      text: 'Devs: "Enter an email address" [if left blank] or "Enter an email address in the correct format, like name@example.com" [if in the wrong format] ',
      href: '#email'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.agencyStatus = 'completed'
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/application/child-social-worker-details', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  // ********************** Family court finder **********************
  router.post('/r2/children/family-court-finder', function(req, res) {
    console.log(req.body['placementCourtName'])
    var errors = []
    if (req.body['same-family-court'] === undefined) {
      errors.push({
        text: "Please answer the question",
        href: '#no-radio'
        })
    }
    else if (req.body['familyCourtName'] === '' && req.body['same-family-court'] === 'No') {
      errors.push({
      text: "Enter the name of the court",
      href: '#no-court-name'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['same-family-court'] === 'Yes') {
          req.session.data.familyCourtName = req.body['placementCourtName']
        }
        req.session.data.familyCourtStatus = 'completed'
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/children/family-court-finder', { errors: errors })
      }
    }
    else {
      if (req.body['court-name'] === '') {
        res.redirect('/r2/task-list')
      }
      else {
        req.session.data.familyCourtStatus = 'in progress'
        res.redirect('/r2/task-list')
      }
    }
  })






// ******************************************** SECTION 2. APPLICANTS ********************************************
// ************************************************************************************************************************************

  // ********************** First applicant personal details **********************
  router.post('/r2/applicants/first-applicant-name', function(req, res) {
    var errors = []
    if (req.body['first-applicant-names'] === '') {
      errors.push({
      text: 'Enter your first names',
      href: '#first-names'
      })
    }
    if (req.body['first-applicant-last-names'] === '') {
      errors.push({
      text: 'Enter your last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantPersonalDetailsStatus = 'in progress'
        res.redirect('/r2/applicants/first-applicant-other-names')
      }
      else {
        res.render('.//r2/applicants/first-applicant-name', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/first-applicant-other-names', function(req, res) {
    var errors = []

    if (req.body['first-applicant-other-names'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#first-applicant-other-names'
      })
    }
    else if (req.body['first-applicant-other-names'] === "Yes") {
      if (req.body['first-applicant-previous-first-names'].length === 0 && req.session.data.firstApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#first-applicant-no-first-names'
        })
      }
      if (req.body['first-applicant-previous-last-names'].length === 0  && req.session.data.firstApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#first-applicant-no-last-names'
        })
      }
    }
    if (req.body['submit-button'] === 'add') {
      if (req.body['first-applicant-previous-first-names'].length === 0  && req.session.data.firstApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#first-applicant-no-additional-first-names'
        })
      }
      if (req.body['first-applicant-previous-last-names'].length === 0 && req.session.data.firstApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#first-applicant-no-additional-last-names'
        })
      }
    }

    count = req.session.data.firstApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      if (req.body['first-applicant-previous-first-names'] !== '' && req.body['first-applicant-previous-last-names'] !== '') {
        req.session.data.firstApplicantPreviousFirstNames[count] = req.body['first-applicant-previous-first-names']
        req.session.data.firstApplicantPreviousLastNames[count] = req.body['first-applicant-previous-last-names']
        req.session.data.idFirstApplicant[count] = count
        req.session.data.firstApplicantNameCount = count + 1
        res.redirect('/r2/applicants/first-applicant-other-names')
      }
      else {
        res.render('.//r2/applicants/first-applicant-other-names', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['first-applicant-previous-first-names'].length !== 0 && req.body['first-applicant-previous-last-names'].length !==0) {
          req.session.data.firstApplicantPreviousFirstNames[count] = req.body['first-applicant-previous-first-names']
          req.session.data.firstApplicantPreviousLastNames[count] = req.body['first-applicant-previous-last-names']
          req.session.data.idFirstApplicant[count] = count
          req.session.data.firstApplicantNameCount = count + 1
        }
        res.redirect('/r2/applicants/first-applicant-date-birth')
      }
      else {
        res.render('.//r2/applicants/first-applicant-other-names', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/first-applicant-date-birth', function(req, res) {
    var errors = []
    if (req.body['first-applicant-day'] === '' || req.body['first-applicant-month'] === '' || req.body['first-applicant-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-149 for different error messages',
      href: '#first-applicant-date-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/r2/applicants/first-applicant-occupation')
        }
        else {
          res.render('.//r2/applicants/first-applicant-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/r2/task-list')
      }
  })


  router.post('/r2/applicants/first-applicant-nationality', function(req, res) {
    var errors = []

    if (req.body['first-applicant-british'] === undefined && req.body['first-applicant-irish'] === undefined && req.body['first-applicant-other'] === undefined) {
      // console.log("error")
      errors.push({
      text: 'Select if you are British, Irish or a citizen of a different country',
      href: '#first-applicant-nationality'
      })
    }
    else if (req.body['first-applicant-other'] !== undefined && req.session.data.firstApplicantNationalityCount === 0) {
      // console.log("no nationality added error: ", req.session.data.firstApplicantNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#first-applicant-no-nationality'
      })
    }

    count = req.session.data.firstApplicantNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantNationalities[count] = req.body['first-applicant-different-country']
        res.redirect('/r2/applicants/first-applicant-occupation')
      }
      else {
        res.render('.//r2/applicants/first-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/r2/task-list')
    }
    else if (req.body['submit-button'] === 'add' && req.body['first-applicant-different-country'] !== '') {
      req.session.data.firstApplicantNationalities[count] = req.body['first-applicant-different-country']
      req.session.data.firstApplicantNationalityId[count] = count
      req.session.data.firstApplicantNationalityCount = count + 1
      res.redirect('/r2/applicants/first-applicant-nationality')
    }
    else {
      res.render('.//r2/applicants/first-applicant-nationality', { errors: errors })
    }
  })


  router.post('/r2/applicants/first-applicant-occupation', function(req, res) {
    var errors = []
    if (req.body['first-applicant-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#first-applicant-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantPersonalDetailsStatus = 'completed'
        res.redirect('/r2/task-list')
      }
      else {
          res.render('.//r2/applicants/first-applicant-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })





  // ********************** First applicant contact details **********************
  router.post('/r2/applicants/first-applicant-address', function(req, res) {
    var errors = []
    if (req.body['first-applicant-address'] === "") {
      errors.push({
      text: 'Enter a real postcode',
      href: '#first-applicant-address'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantContactDetailsStatus = 'in progress'
        res.redirect('/r2/applicants/first-applicant-find-address')
      }
      else {
        res.render('.//r2/applicants/first-applicant-address', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/first-applicant-find-address', function(req, res) {
    var errors = []
    if (req.body['first-applicant-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#first-applicant-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/r2/applicants/first-applicant-contact')
      }
      else {
        res.render('.//r2/applicants/first-applicant-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/first-applicant-enter-address-manually', function(req, res) {
    var errors = []
    if (req.body['first-applicant-address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['first-applicant-address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['first-applicant-address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantContactDetailsStatus = 'in progress'
        res.redirect('/r2/applicants/first-applicant-contact')
      }
      else {
        res.render('.//r2/applicants/first-applicant-enter-address-manually', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/first-applicant-contact', function(req, res) {
    var errors = []
    if (req.body['first-applicant-email-address'] === '') {
      errors.push({
        text: 'Enter your email address',
        href: '#first-applicant-email'
        })
    }
    if (req.body['first-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter a UK telephone number',
        href: '#first-applicant-phone-number'
        })
    }
    if (req.body['first-applicant-served-email'] === undefined) {
      errors.push({
        text: 'Please answer the question',
        href: '#first-applicant-consent'
        })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.firstApplicantContactDetailsStatus = 'completed'
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/applicants/first-applicant-contact', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })




  // ********************** Second applicant personal details **********************
  router.post('/r2/applicants/second-applicant-name', function(req, res) {
    var errors = []
    if (req.body['second-applicant-names'] === '') {
      errors.push({
      text: 'Enter your first names',
      href: '#first-names'
      })
    }
    if (req.body['second-applicant-last-names'] === '') {
      errors.push({
      text: 'Enter your last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantPersonalDetailsStatus = 'in progress'
        res.redirect('/r2/applicants/second-applicant-other-names')
      }
      else {
        res.render('.//r2/applicants/second-applicant-name', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/second-applicant-other-names', function(req, res) {
    var errors = []

    if (req.body['second-applicant-other-names'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#second-applicant-other-names'
      })
    }
    else if (req.body['second-applicant-other-names'] === "Yes") {
      if (req.body['second-applicant-previous-first-names'].length === 0 && req.session.data.secondApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#second-applicant-no-first-names'
        })
      }
      if (req.body['second-applicant-previous-last-names'].length === 0  && req.session.data.secondApplicantNameCount < 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#second-applicant-no-last-names'
        })
      }
    }
    if (req.body['submit-button'] === 'add') {
      if (req.body['second-applicant-previous-first-names'].length === 0  && req.session.data.secondApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your first names',
          href: '#second-applicant-no-additional-first-names'
        })
      }
      if (req.body['second-applicant-previous-last-names'].length === 0 && req.session.data.secondApplicantNameCount >= 1) {
        errors.push({
          text: 'Enter your last names',
          href: '#second-applicant-no-additional-last-names'
        })
      }
    }

    count = req.session.data.secondApplicantNameCount
    if (req.body['submit-button'] === 'add') {
      if (req.body['second-applicant-previous-first-names'] !== '' && req.body['second-applicant-previous-last-names'] !== '') {
        req.session.data.secondApplicantPreviousFirstNames[count] = req.body['second-applicant-previous-first-names']
        req.session.data.secondApplicantPreviousLastNames[count] = req.body['second-applicant-previous-last-names']
        req.session.data.idSecondApplicant[count] = count
        req.session.data.secondApplicantNameCount = count + 1
        res.redirect('/r2/applicants/second-applicant-other-names')
      }
      else {
        res.render('.//r2/applicants/second-applicant-other-names', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        if (req.body['second-applicant-previous-first-names'].length !== 0 && req.body['second-applicant-previous-last-names'].length !==0) {
          req.session.data.secondApplicantPreviousFirstNames[count] = req.body['second-applicant-previous-first-names']
          req.session.data.secondApplicantPreviousLastNames[count] = req.body['second-applicant-previous-last-names']
          req.session.data.idSecondApplicant[count] = count
          req.session.data.secondApplicantNameCount = count + 1
        }
        res.redirect('/r2/applicants/second-applicant-date-birth')
      }
      else {
        res.render('.//r2/applicants/second-applicant-other-names', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/second-applicant-date-birth', function(req, res) {
    // console.log("Day: ", req.body['day'])
    var errors = []
    if (req.body['second-applicant-day'] === '' || req.body['second-applicant-month'] === '' || req.body['second-applicant-year'] === '') {
      errors.push({
      text: 'Developers: please refer to ADOP-149 for different error messages',
      href: '#second-applicant-date-birth'
      })
    }
      if (req.body['submit-button'] === 'save-and-continue') {
        if (errors.length === 0) {
          res.redirect('/r2/applicants/second-applicant-occupation')
        }
        else {
          res.render('.//r2/applicants/second-applicant-date-birth', { errors: errors })
        }
      }
      else {
        res.redirect('/r2/task-list')
      }
  })


  router.post('/r2/applicants/second-applicant-nationality', function(req, res) {
    var errors = []

    if (req.body['second-applicant-british'] === undefined && req.body['second-applicant-irish'] === undefined &&req.body['second-applicant-other'] === undefined) {
      // console.log("error")
      errors.push({
      text: 'Select if you are British, Irish or a citizen of a different country',
      href: '#second-applicant-nationality'
      })
    }
    else if (req.body['second-applicant-other'] !== undefined && req.session.data.secondApplicantNationalityCount === 0) {
      // console.log("no nationality added error: ", req.session.data.secondApplicantNationalities)
      errors.push({
      text: 'This is not a valid entry',
      href: '#second-applicant-no-nationality'
      })
    }

    count = req.session.data.secondApplicantNationalityCount
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantNationalities[count] = req.body['second-applicant-different-country']
        res.redirect('/r2/applicants/second-applicant-occupation')
      }
      else {
        res.render('.//r2/applicants/second-applicant-nationality', { errors: errors })
      }
    }
    else if (req.body['submit-button'] === 'save-as-draft') {
      res.redirect('/r2/task-list')
    }
    else if (req.body['submit-button'] === 'add' && req.body['second-applicant-different-country'] !== '') {
      req.session.data.secondApplicantNationalities[count] = req.body['second-applicant-different-country']
      req.session.data.secondApplicantNationalityId[count] = count
      req.session.data.secondApplicantNationalityCount = count + 1
      res.redirect('/r2/applicants/second-applicant-nationality')
    }
    else {
      res.render('.//r2/applicants/second-applicant-nationality', { errors: errors })
    }
  })


  router.post('/r2/applicants/second-applicant-occupation', function(req, res) {
    var errors = []
    if (req.body['second-applicant-occupation'] === '') {
      errors.push({
      text: 'Enter your occupation',
      href: '#second-applicant-occupation'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantPersonalDetailsStatus = 'completed'
        res.redirect('/r2/task-list')
      }
      else {
          res.render('.//r2/applicants/second-applicant-occupation', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })





  // ********************** Second applicant contact details **********************
  router.post('/r2/applicants/second-applicant-same-address', function(req, res) {
    var errors = []
    if (req.body['same-address'] === undefined) {
      errors.push({
      text: 'Please answer the question',
      href: '#second-applicant-same-address'
      })
    }

    if (errors.length === 0) {
    if (req.body['submit-button'] === 'save-and-continue') {
        if (req.body['same-address'] === "Yes") {
          req.session.data.secondApplicantContactDetailsStatus = 'in progress'
          res.redirect('/r2/applicants/second-applicant-contact')
        }
        else {
          res.redirect('/r2/applicants/second-applicant-address')
        }
      }
      else {
        res.redirect('/r2/task-list')
      }
    }
    else {
        res.render('.//r2/applicants/second-applicant-same-address', { errors: errors })
    }

  })


  router.post('/r2/applicants/second-applicant-address', function(req, res) {
    var errors = []
    if (req.body['second-applicant-address'] === "") {
      errors.push({
      text: 'Enter a real postcode',
      href: '#second-applicant-address'
      })
    }
    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantContactDetailsStatus = 'in progress'
        res.redirect('/r2/applicants/second-applicant-find-address')
      }
      else {
        res.render('.//r2/applicants/second-applicant-address', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/second-applicant-find-address', function(req, res) {
    var errors = []
    if (req.body['second-applicant-choose-address'] === 'address-found') {
      errors.push({
      text: 'Select an address',
      href: '#second-applicant-find-address'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        res.redirect('/r2/applicants/second-applicant-contact')
      }
      else {
        res.render('.//r2/applicants/second-applicant-find-address', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/second-applicant-enter-address-manually', function(req, res) {
    var errors = []
    if (req.body['second-applicant-address-line-1'] === '') {
      errors.push({
      text: 'Enter the first line of the address',
      href: '#first-line'
      })
    }
    if (req.body['second-applicant-address-town'] === '') {
      errors.push({
      text: 'Enter the town or city',
      href: '#town'
      })
    }
    if (req.body['second-applicant-address-postcode'] === '') {
      errors.push({
      text: 'Enter the postcode',
      href: '#postcode'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantContactDetailsStatus = 'in progress'
        res.redirect('/r2/applicants/second-applicant-contact')
      }
      else {
        res.render('.//r2/applicants/second-applicant-enter-address-manually', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/applicants/second-applicant-contact', function(req, res) {
    var errors = []
    if (req.body['second-applicant-email-address'] === '') {
      errors.push({
        text: 'Enter your email address',
        href: '#second-applicant-email'
        })
    }
    if (req.body['second-applicant-phone-number'] === '') {
      errors.push({
        text: 'Enter a UK telephone number',
        href: '#second-applicant-phone-number'
        })
    }
    if (req.body['second-applicant-served-email'] === undefined) {
      errors.push({
        text: 'Please answer the question',
        href: '#second-applicant-consent'
        })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondApplicantContactDetailsStatus = 'completed'
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/applicants/second-applicant-contact', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })






  // ********************** Second applicant upload **********************
  router.post('/r2/applicants/second-applicant-upload', function(req, res) {
    var errors = []
    if (req.body['second-applicant-upload'] === '') {
      errors.push({
      text: 'Error message',
      href: '#second-applicant-upload'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.secondupload = 1
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/applicants/second-applicant-upload', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })




// ******************************************** SECTION 3. CHILDREN ********************************************
// ************************************************************************************************************************************

// ******************************************** Child's details ********************************************
  router.post('/r2/children/child-name', function(req, res) {
    var errors = []
    if (req.body['child-first-names'] === '') {
      errors.push({
      text: 'Enter the child\'s first names',
      href: '#first-names'
      })
    }
    if (req.body['child-last-names'] === '') {
      errors.push({
      text: 'Enter the child\'s last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childDetailsStatus = 'in progress'
        res.redirect('/r2/children/child-post-adoption-name')
      }
      else {
        res.render('.//r2/children/child-name', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })



  router.post('/r2/children/child-post-adoption-name', function(req, res) {
    var errors = []
    if (req.body['certificate-first-names'] === '') {
      errors.push({
      text: 'Enter their first names',
      href: '#first-names'
      })
    }
    if (req.body['certificate-last-names'] === '') {
      errors.push({
      text: 'Enter their last names',
      href: '#last-names'
      })
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.adoptionCertificateStatus = 'completed'
        res.redirect('/r2/task-list')
      }
      else {
        res.render('.//r2/children/child-post-adoption-name', { errors: errors })
      }
    }
    else {
      if (req.body['certificate-first-names'] === '' && req.body['certificate-last-names'] === '') {
        res.redirect('/r2/task-list')
      }
      else {
        req.session.data.adoptionCertificateStatus = 'in progress'
        res.redirect('/r2/task-list')
      }
    }
  })
















  // ************************************* Placement and court orders ************************************* //


  router.post('/r2/children/orders-placement-court', function(req, res) {
    var errors = []
    if (req.body['placement-court-name'] === '') {
      errors.push({
      text: 'Enter the name of the court',
      href: '#court-name'
      })
    }

    count = req.session.data.childOrderCount

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
        req.session.data.childOrderCourt[count] = req.body['placement-court-name']
        req.session.data.childOrderCompleted[count] = "No"
        res.redirect('/r2/children/family-court-finder')
      }
      else {
        res.render('.//r2/children/orders-placement-court', { errors: errors })
      }
    }
    else {
      if (req.body['placement-court-name'] === '') {
        res.redirect('/r2/task-list')
      }
      else {
        req.session.data.placementStatus = 'in progress'
        res.redirect('/r2/task-list')
      }
    }
  })




// ******************************************** SECTION 4. UPLOADS ********************************************
// ************************************************************************************************************************************

  // ********************** Uploads  **********************
  router.post('/r2/upload/applicants-documents-upload', function(req, res) {
    // var errors = []
    // if (req.body['sibling-new-court-name'] === '') {
    //   errors.push({
    //   text: 'Please answer the question',
    //   href: '#order-court-name'
    //   })
    // }

//    if (errors.length === 0) {
  if (req.body['submit-button'] === 'save-and-continue') {
      req.session.data.applicantsUpload = 1
      res.redirect('/r2/task-list')
    }
    else {
      res.redirect('/r2/task-list')
    }
  })


  router.post('/r2/upload/child-documents-upload', function(req, res) {
    // var errors = []
    // if (req.body['sibling-new-court-name'] === '') {
    //   errors.push({
    //   text: 'Please answer the question',
    //   href: '#order-court-name'
    //   })
    // }

//    if (errors.length === 0) {
  if (req.body['submit-button'] === 'save-and-continue') {
      req.session.data.childUpload = 1
      res.redirect('/r2/task-list')
    }
    else {
      res.redirect('/r2/task-list')
    }
  })





// ******************************************** SECTION 5. CHECK, PAY AND SUBMIT ********************************************
// ************************************************************************************************************************************


//**************************************** Check, Pay and Submit ************************************************************

  router.post('/r2/check-pay-and-submit/check-your-answers', function(req, res) {
    req.session.data.reviewStatus = 'in progress'
    if (req.body['submit-button'] === 'save-and-continue') {
      res.redirect('/r2/check-pay-and-submit/declaration')
    }
    else {
      res.redirect('/r2/task-list')
    }
  })




//    router.post('/r2/check-pay-and-submit/payment', function(req, res) {
  //    res.redirect('/r2/check-pay-and-submit/confirmation')
  //      })

  router.post('/r2/check-pay-and-submit/declaration', function(req, res) {
    var errors = []
    if (req.session.data.numberApplicants === '1') {
      if (req.body['statement-truth1'] == undefined) {
        console.log("Statement of truth: ", req.body['statement-truth1'])
        errors.push({
        text: "Confirm your statement of truth",
        href: '#statement-truth'
        })
      }
      if (req.body['your-full-name1'] === '') {
        errors.push({
        text: "Enter a full name",
        href: '#your-name'
        })
      }
    }
    else {
      if (req.body['statement-truth'] == undefined) {
        console.log("Statement of truth: ", req.body['statement-truth'])
        errors.push({
        text: "Confirm your statement of truth",
        href: '#statement-truth'
        })
      }
      if (req.body['your-full-name'] === '') {
        errors.push({
        text: "Enter a full name",
        href: '#your-name'
        })
      }
      if (req.body['authorised'] === undefined && req.body['partner-full-name'] === '') {
        errors.push({
        text: "Enter a full name",
        href: '#partner'
        })
      }
    }

    if (req.body['submit-button'] === 'save-and-continue') {
      if (errors.length === 0) {
//        req.session.data.reviewStatus = 'completed'
        res.redirect('https://products.payments.service.gov.uk/pay/02133e4814ea416cb7a1e540b49a8545')
      }
      else {
        res.render('.//r2/check-pay-and-submit/declaration', { errors: errors })
      }
    }
    else {
      res.redirect('/r2/task-list')
    }
  })




// ******************************************** X-UI Case worker ********************************************
// ************************************************************************************************************************************


  router.post('/r2/includes/next-steps-case-worker', function(req, res) {
    if (req.body['next-steps'] === 'notes') {
      res.redirect('/r2/x-ui/case-worker/case-worker-notes')
    }
    else {
      res.redirect('/r2/x-ui/case-worker/')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-manage-documents', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      if (req.body['document-type'] === 'Statements') {
        res.redirect('/r2/x-ui/case-worker/case-worker-statements-select-respondent')
      }
      else {
        res.redirect('/r2/x-ui/case-worker/case-worker-upload')
      }
    }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-documents')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-statements-select-respondent', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      // if (req.body['respondent-role'] === 'birth mother' || req.body['respondent-role'] === 'birth father' || req.body['respondent-role'] === 'person with parental responsibility') {
      //   res.redirect('/r2/x-ui/case-worker/case-worker-intention-oppose')
      // }
      // else {
      res.redirect('/r2/x-ui/case-worker/case-worker-upload')
    }
    // }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-manage-documents')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-intention-oppose', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      if (req.body['intend-oppose'] === 'no') {
        req.session.data.intentionOppose = 'no'
      }
      else {
        req.session.data.intentionOppose = 'yes'
      }
      res.redirect('/r2/x-ui/case-worker/case-worker-upload')
    }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-statements-select-respondent')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-upload', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/r2/x-ui/case-worker/case-worker-documents')
    }
    else if (req.body['add-new-button'] === 'add-new-button-top' || req.body['add-new-button'] === 'add-new-button-bottom' || req.body['remove-button'] === 'remove') {
      res.redirect('/r2/x-ui/case-worker/case-worker-upload')
    }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-manage-documents')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-message-radios', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/r2/x-ui/case-worker/case-worker-messages-select-person')
    }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-messages')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-messages-select-person', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/r2/x-ui/case-worker/case-worker-send-message')
    }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-message-radios')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-send-message', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/r2/x-ui/case-worker/case-worker-message-sent')
    }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-messages-select-person')
    }
  })


  router.post('/r2/x-ui/case-worker/case-worker-message-sent', function(req, res) {
    if (req.body['submit-button'] === 'continue') {
      res.redirect('/r2/x-ui/case-worker/case-worker-messages')
    }
    else {
      res.redirect('/r2/x-ui/case-worker/case-worker-send-message')
    }
  })


  router.post('/r2/x-ui/case-worker/index', function(req, res) {
    console.log(req.body['next-steps'])
    if (req.body['next-steps'] === 'manage-documents') {
      res.redirect('/r2/x-ui/case-worker/case-worker-manage-documents')
    }
    else if (req.body['next-steps'] === 'notes') {
      req.session.data.newNote = 'yes'
      res.redirect('/r2/x-ui/case-worker/case-worker-add-note')
    }
    else if (req.body['next-steps'] === 'send-a-message') {
      res.redirect('/r2/x-ui/case-worker/case-worker-message-radios')
    }
  })


  // ***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
// ************************************* Old functions not in use any more ************************************* //

  // router.post('/r2/check-pay-and-submit/need-help-with-fees-ref', function(req, res) {
  //   var errors = []
  //   if (req.body['help-with-fees-ref'] === undefined) {
  //     errors.push({
  //     text: "Select an option",
  //     href: '#help-with-fees-ref'
  //     })
  //   }
  //   else if (req.body['help-with-fees-ref'] === "yes" && req.body['ref'].length === 0) {
  //     errors.push({
  //       text: 'Enter your reference number',
  //       href: '#no-number'
  //     })
  //   }

  //   if (errors.length === 0) {
  //     if (req.body['help-with-fees-ref'] === "yes") {
  //       res.redirect('/r2/check-pay-and-submit/help-with-fees-send-app')
  //     }
  //     else if (req.body['help-with-fees-ref'] === "no") {
  //       res.redirect('/r2/check-pay-and-submit/get-hwf-reference')
  //     }
  //     else {
  //       res.redirect('https://products.payments.service.gov.uk/pay/02133e4814ea416cb7a1e540b49a8545')
  //     }
  //   }
  //   else {
  //       res.render('.//r2/check-pay-and-submit/need-help-with-fees-ref', { errors: errors })
  //   }
  // })



  // router.post('/r2/check-pay-and-submit/get-hwf-reference', function(req, res) {
  //   var errors = []
  //   if (req.body['ref'] === '') {
  //     errors.push({
  //     text: "Enter your reference number",
  //     href: '#no-help-ref'
  //     })
  //   }
  //   if (req.body['continue'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/check-pay-and-submit/help-with-fees-send-app')
  //     }
  //     else {
  //       res.render('.//r2/check-pay-and-submit/get-hwf-reference', { errors: errors })
  //     }
  //   }

  //   })


  // router.post('/r2/check-pay-and-submit/help-with-fees-send-app', function(req, res) {
  //   var errors = []
  //   if (req.body['ref'] === '') {
  //     errors.push({
  //     text: "Enter you reference number",
  //     href: '#no-ref'
  //     })
  //   }
  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/check-pay-and-submit/confirmation')
  //     }
  //     else {
  //       res.render('.//r2/check-pay-and-submit/help-with-fees-send-app', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  //   })


  // router.post('/r2/check-pay-and-submit/process-payment', function(req, res) {
  //   res.redirect('/r2/check-pay-and-submit/confirmation')
  // })


  // router.post('/r2/children/solicitor-helping', function(req, res) {
  //   // console.log("Mother alive: ", req.body['solicitor-helping'])
  //   var errors = []
  //   if (req.body['solicitor-helping'] === undefined) {
  //     errors.push({
  //     text: 'Please answer the question',
  //     href: '#solicitor-helping'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       if (req.body['solicitor-helping'] === 'yes') {
  //         res.redirect('/r2/children/solicitor-details')
  //       }
  //       else {
  //         req.session.data.agencyStatus = 'completed'
  //         res.redirect('/r2/task-list')
  //       }
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-helping', { errors: errors })
  //     }
  //   }
  //   else {
  //       res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/solicitor-details', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-company-name'] === '') {
  //     errors.push({
  //     text: 'Enter a practice or company name',
  //     href: '#name'
  //     })
  //   }
  //   if (req.body['solicitor-name'] === '') {
  //     errors.push({
  //     text: 'Enter the solicitor\'s name',
  //     href: '#solicitorName'
  //     })
  //   }
  //   if (req.body['solicitor-phone-number'] === '') {
  //     errors.push({
  //     text: 'Enter a UK telephone number',
  //     href: '#phone'
  //     })
  //   }
  //   if (req.body['solicitor-email'] === '') {
  //     errors.push({
  //     text: 'Enter an email address',
  //     href: '#email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       req.session.data.agencyStatus = 'completed'
  //       res.redirect('/r2/task-list')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-details', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })



  // router.post('/r2/children/mother-why-no-address', function(req, res) {
  //   var errors = []
  //   if (req.body['mother-why-no-address'] === '') {
  //     errors.push({
  //     text: 'Enter your occupation',
  //     href: '#mother-why-no-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/task-list')
  //     }
  //     else {
  //         res.render('.//r2/children/mother-why-no-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/father-why-no-address', function(req, res) {
  //   var errors = []
  //   if (req.body['father-why-no-address'] === '') {
  //     errors.push({
  //     text: 'Enter your occupation',
  //     href: '#father-why-no-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/task-list')
  //     }
  //     else {
  //         res.render('.//r2/children/father-why-no-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })



  // router.post('/r2/children/children/applicant-adoption-agency-details', function(req, res) {
  //   var errors = []
  //   if (req.body['agency-name'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#agency-name'
  //     })
  //   }
  //   if (req.body['phone-number'] === '') {
  //     errors.push({
  //     text: 'Enter a telephone number',
  //     href: '#phone-number'
  //     })
  //   }
  //   if (req.body['contact-name'] === '') {
  //     errors.push({
  //     text: 'Enter a name',
  //     href: '#contact-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/child-adoption-agency-name')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-adoption-agency-details', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-social-worker-name', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-name'] === '') {
  //     errors.push({
  //     text: 'Enter the name of the social worker',
  //     href: '#applicant-social-worker-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/applicant-social-worker-email')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-social-worker-name', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-social-worker-email', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-email'] === '') {
  //     errors.push({
  //     text: 'Enter an email address',
  //     href: '#applicant-social-worker-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/applicant-social-worker-team-email')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-social-worker-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-social-worker-team-email', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-team-email'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['team-email'] === '') {
  //     errors.push({
  //       text: 'Enter a valid email address',
  //       href: '#no-team-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/applicant-social-worker-number')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-social-worker-team-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-social-worker-number', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-number'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['applicant-social-worker-number'] === '') {
  //     errors.push({
  //       text: 'Enter a number',
  //       href: '#no-number'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/applicant-social-worker-address')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-social-worker-number', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-social-worker-address', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-address'] === "") {
  //     errors.push({
  //     text: 'Enter a valid postcode',
  //     href: '#applicant-social-worker-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/applicant-social-worker-find-address')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-social-worker-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-social-worker-find-address', function(req, res) {
  //   var errors = []
  //   if (req.body['applicant-social-worker-choose-address'] === 'address-found') {
  //     errors.push({
  //     text: 'Select an address',
  //     href: '#applicant-social-worker-find-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/child-adoption-agency-name')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-social-worker-find-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-social-worker-enter-address-manually', function(req, res) {
  //   var errors = []
  //   if (req.body['address-line-1'] === '') {
  //     errors.push({
  //     text: 'Enter the first line of the address',
  //     href: '#first-line'
  //     })
  //   }
  //   if (req.body['address-town'] === '') {
  //     errors.push({
  //     text: 'Enter the town or city',
  //     href: '#town'
  //     })
  //   }
  //   if (req.body['address-postcode'] === '') {
  //     errors.push({
  //     text: 'Enter the postcode',
  //     href: '#postcode'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/child-adoption-agency-name')
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-social-worker-enter-address-manually', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })

//************************ Child's adoption agency or local authority *****************************

// router.post('/r2/children/child-adoption-agency-name', function(req, res) {
//   var errors = []
//   if (req.body['child-adoption-agency-name'] === '') {
//     errors.push({
//     text: 'Enter the name of the adoption agency',
//     href: '#child-adoption-agency-name'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/r2/children/child-social-worker-name')
//     }
//     else {
//       res.render('.//r2/children/child-adoption-agency-name', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/r2/task-list')
//   }
// })



// router.post('/r2/children/child-social-worker-name', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-name'] === '') {
//     errors.push({
//     text: 'Enter the name of the social worker',
//     href: '#child-social-worker-name'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/r2/children/child-social-worker-email')
//     }
//     else {
//       res.render('.//r2/children/child-social-worker-name', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/r2/task-list')
//   }
// })

// router.post('/r2/children/child-social-worker-email', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-email'] === '') {
//     errors.push({
//     text: 'Enter the email address',
//     href: '#child-social-worker-email'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/r2/children/child-social-worker-team-email')
//     }
//     else {
//       res.render('.//r2/children/child-social-worker-email', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/r2/task-list')
//   }
// })

//TO FIX - MULTIPLE ERROR MESSAGE NEEDED

  // router.post('/r2/children/child-social-worker-team-email', function(req, res) {
  //   var errors = []
  //   if (req.body['child-social-worker-team-email'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['team-email'] === '') {
  //     errors.push({
  //       text: 'Enter a valid email address',
  //       href: '#no-team-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/child-social-worker-number')
  //     }
  //     else {
  //       res.render('.//r2/children/child-social-worker-team-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


//TO FIX - MULTIPLE ERROR MESSAGE NEEDED
// router.post('/r2/children/child-social-worker-number', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-number'] === undefined) {
//     errors.push({
//     text: 'Select an answer',
//     href: '#no-radio-chosen'
//     })
//   }
//   else if (req.body['number'] === '') {
//     errors.push({
//       text: 'Enter a phone number',
//       href: '#no-number'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/r2/children/child-social-worker-address')
//     }
//     else {
//       res.render('.//r2/children/child-social-worker-number', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/r2/task-list')
//   }
// })


// router.post('/r2/children/child-social-worker-address', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-address'] === "") {
//     errors.push({
//     text: 'Enter a valid postcode',
//     href: '#child-social-worker-address'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/r2/children/child-social-worker-find-address')
//     }
//     else {
//       res.render('.//r2/children/child-social-worker-address', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/r2/task-list')
//   }
// })

// router.post('/r2/children/child-social-worker-find-address', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-choose-address'] === 'address-found') {
//     errors.push({
//     text: 'Select an address',
//     href: '#child-social-worker-find-address'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/r2/children/solicitor-helping')
//     }
//     else {
//       res.render('.//r2/children/child-social-worker-find-address', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/r2/task-list')
//   }
// })


// router.post('/r2/children/child-social-worker-enter-address-manually', function(req, res) {
//   var errors = []
//   if (req.body['child-social-worker-address-line-1'] === '' || req.body['child-social-worker-postcode'] === ''){
//     errors.push({
//     text: 'Enter address',
//     href: '#child-social-worker-manual-address'
//     })
//   }

//   if (req.body['submit-button'] === 'save-and-continue') {
//     if (errors.length === 0) {
//       res.redirect('/r2/solicitor-helping')
//     }
//     else {
//       res.render('.//r2/children/child-social-worker-enter-address-manually', { errors: errors })
//     }
//   }
//   else {
//     res.redirect('/r2/task-list')
//   }
// })


  // router.post('/r2/children/solicitor-firm-name', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-firm-name'] === '') {
  //     errors.push({
  //     text: 'Enter the name of the practice or company',
  //     href: '#solicitor-firm-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/solicitor-name')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-firm-name', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })

  // router.post('/r2/children/solicitor-name', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-name'] === '') {
  //     errors.push({
  //     text: 'Enter the name of your solicitor',
  //     href: '#solicitor-name'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/solicitor-email')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-name', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })

  // router.post('/r2/children/solicitor-email', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-email'] === '') {
  //     errors.push({
  //     text: 'Enter an email address',
  //     href: '#solicitor-email'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/solicitor-number')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-email', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/solicitor-address', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-address'] === "") {
  //     errors.push({
  //     text: 'Enter a valid postcode',
  //     href: '#solicitor-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/solicitor-find-address')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })

  // router.post('/r2/children/solicitor-enter-address-manually', function(req, res) {
  //   var errors = []
  //   if (req.body['address-line-1'] === '') {
  //     errors.push({
  //     text: 'Enter the first line of the address',
  //     href: '#first-line'
  //     })
  //   }
  //   if (req.body['address-town'] === '') {
  //     errors.push({
  //     text: 'Enter the town or city',
  //     href: '#town'
  //     })
  //   }
  //   if (req.body['address-postcode'] === '') {
  //     errors.push({
  //     text: 'Enter the postcode',
  //     href: '#postcode'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/task-list')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-enter-address-manually', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })

  // router.post('/r2/children/solicitor-find-address', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-choose-address'] === 'address-found') {
  //     errors.push({
  //     text: 'Select an address',
  //     href: '#solicitor-find-address'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/task-list')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-find-address', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/solicitor-number', function(req, res) {
  //   var errors = []
  //   if (req.body['solicitor-number'] === undefined) {
  //     errors.push({
  //     text: 'Select an answer',
  //     href: '#no-radio-chosen'
  //     })
  //   }
  //   else if (req.body['number'] === '') {
  //     errors.push({
  //       text: 'Enter a number',
  //       href: '#no-number'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       res.redirect('/r2/children/solicitor-address')
  //     }
  //     else {
  //       res.render('.//r2/children/solicitor-number', { errors: errors })
  //     }
  //   }
  //   else {
  //     res.redirect('/r2/task-list')
  //   }
  // })


  // router.post('/r2/children/applicant-adoption-agency-or-social-worker', function(req, res) {
  //   var errors = []
  //   if (req.body['agency'] === undefined) {
  //     errors.push({
  //     text: 'Please select an answer',
  //     href: '#agency'
  //     })
  //   }

  //   if (req.body['submit-button'] === 'save-and-continue') {
  //     if (errors.length === 0) {
  //       if (req.body['agency'] === 'yes') {
  //         res.redirect('/r2/children/child-')
  //       }
  //       else {
  //         res.redirect('/r2/children/child-social-worker-details')
  //       }
  //     }
  //     else {
  //       res.render('.//r2/children/applicant-adoption-agency-or-social-worker', { errors: errors })
  //     }
  //   }
  //   else {
  //       res.redirect('/r2/task-list')
  //   }
  // })










//   router.post('/r2/eligibility/10-weeks', function(req, res) {
//     var errors = []
//     if (req.body['10-weeks'] === undefined) {
//       errors.push({
//       text: 'Select an answer',
//       href: '#10-weeks'
//       })
//     }

//     if (errors.length === 0) {
//         res.redirect('/r2/eligibility/under-18')
//     }
//     else {
//         res.render('.//r2/eligibility/10-weeks', { errors: errors })
//     }
//   })

//   router.post('/r2/applicants/number-of-children', function(req, res) {
//     var errors = []
//     if (req.body['number-children'] === undefined) {
//       errors.push({
//       text: 'Select the number of children you are applying to adopt',
//       href: '#number-of-children'
//       })
//     }
//     else if (req.body['number-children'] === "3 or more" && req.body['more-than-3'] === "") {
//       errors.push({
//       text: 'Enter a number',
//       href: '#exact-number'
//       })
//     }

//     if (req.body['more-than-3'] !== "") {
//       req.session.data.numberChildren = req.body['more-than-3']
//     }
//     else {
//       req.session.data.numberChildren = req.body['number-of-children']
//     }

//     if (req.body['submit-button'] === 'save-and-continue') {
//       if (errors.length === 0) {
//         res.redirect('/r2/applicants/number-of-applicants')
//       }
//       else {
//         res.render('.//r2/applicants/number-of-children', { errors: errors })
//       }
//     }
//     else {
//       res.redirect('/r2/task-list')
//     }
//   })


//   router.post('/r2/applicants/first-applicant-gender', function(req, res) {
//     var errors = []
//     if (req.body['first-applicant-gender'] === '') {
//       errors.push({
//       text: 'Select an answer',
//       href: '#first-applicant-gender'
//       })
//     }
//       if (req.body['submit-button'] === 'save-and-continue') {
//         if (errors.length === 0) {
//           res.redirect('/r2/applicants/first-applicant-nationality')
//         }
//         else {
//             res.render('.//r2/applicants/first-applicant-gender', { errors: errors })
//           }
//       }
//       else {
//         res.redirect('/r2/task-list')
//       }
//   })















// // ************************************* Examples ************************************* //

//   router.post('/damages/default-judgments/5-hearing-details', function(req, res) {
//     req.session.data.unavailable = req.body['exclusion-dates']
//     if (req.body['submit-button'] === 'add') {
//       count = req.session.data.dateCount
//       // console.log("count start", count)
//       req.session.data.dayFrom = req.body['date-from-day']
//       req.session.data.monthFrom = req.body['date-from-month']
//       req.session.data.yearFrom = req.body['date-from-year']
//       req.session.data.dayTo = req.body['date-to-day']
//       req.session.data.monthTo = req.body['date-to-month']
//       req.session.data.yearTo = req.body['date-to-year']

//       req.session.data.id[count] = count
//       req.session.data.startDate[count] = req.body['date-from-day'] + " " + req.session.data.shortMonthName[req.body['date-from-month']] + " " + req.body['date-from-year']
//       req.session.data.endDate[count] = req.body['date-to-day'] + " " + req.session.data.shortMonthName[req.body['date-to-month']] + " " + req.body['date-to-year']

//       // console.log("From", req.session.data.startDate[count]);
//       // console.log("unavailable", req.session.data.unavailable)

//       req.session.data.dateCount = count + 1
//       // console.log("dateCount", req.session.data.dateCount)

//       res.redirect('/damages/default-judgments/5-hearing-details#unavailable-dates')
//       }
//     else if (req.body['submit-button'] === 'continue') {
//       res.redirect('/damages/default-judgments/6-check-your-answers')
//     }
//     else {
//         res.redirect('/damages/default-judgments/4-make-request-judgment')
//     }
//   })















// // Examples from HMRC
// router.post('/sps/work-in-progress/how-to-verify', function(req, res) {
//     // console.log("route", req.session.data.route)
//       if (req.body['verifyOrChange'] === 'verify') {
//           res.redirect('/sps/work-in-progress/confirmation-email-sent')
//       } else {
//         if (req.session.data.route === 'external' || req.session.data.route === 'current-bouncing' || req.session.data.route === 'current-unverified') {
//           res.redirect('/sps/work-in-progress/how-to-verify')
//         }
//         else {
//         req.session.data.route = "settings"
//         res.redirect('/sps/work-in-progress/change-email')
//       }
//       }
//   })

//   // Error messages on how-to-get-tax-letters
//   router.post('/sps/work-in-progress/how-to-get-tax-letters', (req, res) => {
//       var errors = []
//       if (req.body['howContacted'] === undefined) {
//         errors.push({
//           text: 'Select how you want to get your tax letters',
//           href: '#how-to-get-tax-letters'
//         })
//       }
//       if (errors.length === 0) {
//         if (req.body['howContacted'] === 'Online') {
//           res.redirect('/sps/work-in-progress/add-email')
//         }
//       else {
//           if (req.session.data.route === 'external') {
//             res.redirect('/sps/work-in-progress/confirmation-post-alternative')
//           }
//           else {
//           res.redirect('/sps/work-in-progress/confirmation-post')
//         }
//         }
//       } else {
//         res.render('.//sps/work-in-progress/how-toget-tax-letters', { errors: errors })
//       }
// })
};
