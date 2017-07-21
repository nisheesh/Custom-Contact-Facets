using Sitecore.Analytics.Model.Framework;

namespace ContactFacetDemo.Data.Contact.Interface
{
    public interface IContactInteractionsInfo : IFacet
    {
        IPremiumContent PremiumContent { get; }
    }
}
