using System;
using ContactFacetDemo.Data.Contact.Interface;
using Sitecore.Analytics.Model.Framework;

namespace ContactFacetDemo.Data.Contact
{
    [Serializable]
    public class PremiumContent : Element, IPremiumContent
    {
        private const string UnlockedName = "Unlocked";
        public bool Unlocked
        {
            get { return GetAttribute<bool>(UnlockedName); }
            set { SetAttribute(UnlockedName, value); }
        }
        public PremiumContent()
        {
            EnsureAttribute<bool>(UnlockedName);
        }
    }
}
