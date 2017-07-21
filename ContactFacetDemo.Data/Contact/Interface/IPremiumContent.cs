using Sitecore.Analytics.Model.Framework;

namespace ContactFacetDemo.Data.Contact.Interface
{
    public interface IPremiumContent : IElement
    {
        bool Unlocked { get; set; }
    }
}
