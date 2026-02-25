namespace TaskManagement.Server.Design_Pattern
{
    public class AdapterDesignPatternExample
    {
        class Program
        {
            static void Main()
            {
                IPaymentProcessor paymentProcessor = new StripeAdapter(new StripeService());
                paymentProcessor.ProcessPayment(100);
            }
        }

        public class StripeAdapter : IPaymentProcessor
        {
            private readonly StripeService _stripeService;

            public StripeAdapter(StripeService stripeService) => 
                _stripeService = stripeService;

            public void ProcessPayment(decimal amount) =>
                _stripeService.MakeCharge(amount);
        }

        public class StripeService
        {
            public void MakeCharge(decimal total) =>
                Console.WriteLine($"Stripe charged {total}");
        }

        public interface IPaymentProcessor
        {
            void ProcessPayment(decimal amount);
        }
    }


    
}
