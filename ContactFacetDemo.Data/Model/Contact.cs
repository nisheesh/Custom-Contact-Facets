using System.ComponentModel.DataAnnotations;

namespace ContactFacetDemo.Data.Model
{
    public class Contact
    {
        public string ContactId { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public bool OptIn { get; set; }
    }

    public class PremiumContentModel
    {
        public bool ShowPremiumContent { get; set; }

        public string EmailAddress { get; set; }

        public PremiumContentModel()
        {
            ShowPremiumContent = false;
        }
    }
}
