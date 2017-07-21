using System;
using System.Web;
using ContactFacetDemo.Data.Contact;
using ContactFacetDemo.Data.Contact.Interface;
using ContactFacetDemo.Data.Model;
using Sitecore.Analytics;
using Sitecore.Analytics.Model.Entities;

namespace ContactFacetDemo.Data.Repositories
{
    public class ContactRepository
    {
        #region Visitor Identification Methods
        private IContactPersonalInfo _personal;
        private IContactEmailAddresses _emails;
        private IContactPhoneNumbers _phones;
        private IContactAddresses _address;
        private IContactInteractionsInfo _contactInteractions;

        private Sitecore.Analytics.Tracking.Contact CurrentContact => Tracker.Current != null && Tracker.Current.Session != null ? Tracker.Current.Session.Contact : null;

        public bool ContactIdentified
        {
            get
            {
                //if (CurrentContact == null) return false;

                //var visitorIdentified = !EmailInfo.IsEmpty;
                //return visitorIdentified;

                return CurrentContact != null;
            }
        }

        #region Standard facets

        private IContactPersonalInfo PersonalInfo
        {
            get { return _personal ?? (_personal = CurrentContact?.GetFacet<IContactPersonalInfo>("Personal")); }
        }

        private IContactEmailAddresses EmailInfo
        {
            get { return _emails ?? (_emails = CurrentContact?.GetFacet<IContactEmailAddresses>("Emails")); }
        }

        private IContactPhoneNumbers PhoneInfo
        {
            get { return _phones ?? (_phones = CurrentContact?.GetFacet<IContactPhoneNumbers>("Phone Numbers")); }
        }

        private IContactAddresses AddressInfo
        {
            get { return _address ?? (_address = CurrentContact?.GetFacet<IContactAddresses>("Addresses")); }
        }

        #endregion

        #region Custom facets

        private IContactInteractionsInfo Interactions
        {
            get { return _contactInteractions ?? (_contactInteractions = CurrentContact?.GetFacet<IContactInteractionsInfo>(ContactInteractionsInfo.FacetName)); }
        }
        #endregion

        /// <summary>
        /// Setting Identifier method.
        /// </summary>
        /// <param name="identifier"></param>
        private static void SetIdentifier(string identifier)
        {
            Tracker.Current.Session.Identify(identifier);
        }

        public void SetPersonalInfo(string firstname, string middlename, string surname, DateTime? birthdate, string gender, string jobtitle)
        {
            if (!string.IsNullOrEmpty(firstname))
            {
                PersonalInfo.FirstName = firstname;
            }
            if (!string.IsNullOrEmpty(middlename))
            {
                PersonalInfo.MiddleName = middlename;
            }
            if (!string.IsNullOrEmpty(surname))
            {
                PersonalInfo.Surname = surname;
            }
            if (birthdate.HasValue)
            {
                PersonalInfo.BirthDate = birthdate;
            }
            if (!string.IsNullOrEmpty(gender))
            {
                PersonalInfo.Gender = gender;
            }
            if (!string.IsNullOrEmpty(jobtitle))
            {
                PersonalInfo.JobTitle = jobtitle;
            }
        }

        public void SetAddress(string address1, string address2, string city, string state, string postalCode, string type = "default", bool setAsPreferred = true)
        {
            var addressEntry = !AddressInfo.Entries.Contains(type) ? AddressInfo.Entries.Create(type) : AddressInfo.Entries[type];

            if (!string.IsNullOrEmpty(address1))
            {
                addressEntry.StreetLine1 = address1;
            }
            if (!string.IsNullOrEmpty(address2))
            {
                addressEntry.StreetLine2 = address2;
            }
            if (!string.IsNullOrEmpty(city))
            {
                addressEntry.City = city;
            }
            if (!string.IsNullOrEmpty(state))
            {
                addressEntry.StateProvince = state;
            }
            if (!string.IsNullOrEmpty(postalCode))
            {
                addressEntry.PostalCode = postalCode;
            }

            if (setAsPreferred)
            {
                AddressInfo.Preferred = type;
            }
        }

        public void SetEmailAddress(string email, string type = "default", bool setAsPreferred = true, bool updateContactIdentifierWithEmail = true)
        {
            var emailEntry = !EmailInfo.Entries.Contains(type) ? EmailInfo.Entries.Create(type) : EmailInfo.Entries[type];

            emailEntry.SmtpAddress = email;
            if (setAsPreferred)
            {
                EmailInfo.Preferred = type;
            }

            if (updateContactIdentifierWithEmail)
            {
                SetIdentifier(email);
            }
        }

        public void SetPhoneNumber(string phone, string countryCode = "", string extension = "", string type = "default", bool setAsPreferred = true)
        {
            var phoneEntry = !PhoneInfo.Entries.Contains(type) ? PhoneInfo.Entries.Create(type) : PhoneInfo.Entries[type];

            phoneEntry.CountryCode = countryCode;
            phoneEntry.Number = phone;
            phoneEntry.Extension = extension;

            if (setAsPreferred)
            {
                PhoneInfo.Preferred = type;
            }
        }

        public void UnlockPremiumContent()
        {
            Interactions.PremiumContent.Unlocked = true;
        }

        public void LockPremiumContent()
        {
            Interactions.PremiumContent.Unlocked = false;
        }

        private IEmailAddress GetContactEmail(string type = "default")
        {
            return EmailInfo != null ? !EmailInfo.Entries.Contains(type) ? null : EmailInfo.Entries[type] : null;
        }

        private IPhoneNumber GetContactPhone(string type = "default")
        {
            return PhoneInfo != null ? !PhoneInfo.Entries.Contains(type) ? null : PhoneInfo.Entries[type] : null;
        }
        #endregion

        #region Public Methods
        public Model.Contact GetVisitorDetails()
        {
            if (!ContactIdentified) return new Model.Contact();

            var visitorDetails = new Model.Contact
            {
                ContactId = CurrentContact.ContactId.ToString(),
                FirstName = PersonalInfo.FirstName,
                LastName = PersonalInfo.Surname
            };

            var contactEmail = GetContactEmail();
            if (contactEmail != null)
                visitorDetails.EmailAddress = contactEmail.SmtpAddress;

            var contactPhone = GetContactPhone();
            if (contactPhone != null)
                visitorDetails.Phone = contactPhone.Number;

            visitorDetails.OptIn = Interactions.PremiumContent.Unlocked;

            return visitorDetails;
        }

        public Model.Contact GetContactDetails()
        {
            if (!ContactIdentified) return new Model.Contact();

            var contact = GetVisitorDetails();
            return contact;
        }

        public PremiumContentModel GetPremiumContent()
        {
            return !ContactIdentified ? new PremiumContentModel() : new PremiumContentModel() { ShowPremiumContent = Interactions.PremiumContent.Unlocked };
        }

        public void Subscribe(PremiumContentModel premiumContent)
        {
            SetIdentifier(premiumContent.EmailAddress);
            SetEmailAddress(premiumContent.EmailAddress);
            UnlockPremiumContent();
        }

        public static void FlushDataToMongoDb()
        {
            Tracker.Current.EndTracking();
            HttpContext.Current.Session.Abandon();
        }
        #endregion
    }
}
